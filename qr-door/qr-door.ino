#include <Wire.h>
#include <WiFi.h>

#include <PicoEspTime.h>

#include <Firebase_ESP_Client.h>

#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

#include "tiny_code_reader.h"

#include "secrets.h"

/* QR Scanner */

const int scannerSCL = 27;
const int scannerSDA = 26;

/* Buzzer */

const int buzzerPin = 15;

/* RGB LED */

const int rgb[] = { 0, 1, 2 };

/* Wifi */

WiFiMulti multi;

/* RTC */

PicoEspTime rtc;

/* Firebase */

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

/* Timers */

unsigned long scanMillis = 0;
unsigned long buzzerMillis = 0;

const unsigned long scanInterval = 3000;
const unsigned long buzzerInterval = 500;

void ledOff() {
  analogWrite(rgb[0], 255);
  analogWrite(rgb[1], 255);
  analogWrite(rgb[2], 255);
}

void ledErr() {
  analogWrite(rgb[0], 0);
  analogWrite(rgb[1], 255);
  analogWrite(rgb[2], 255);
}

void ledOk() {
  analogWrite(rgb[0], 255);
  analogWrite(rgb[1], 0);
  analogWrite(rgb[2], 255);
}

void setup() {
  /* Start serial at 115200 baud */
  Serial.begin(115200);

  /* Set i2c pins */

  // QR Scanner
  Wire1.setSCL(scannerSCL);
  Wire1.setSDA(scannerSDA);

  // Start communication
  Wire1.begin();

  /* Set pins */

  // Buzzer
  pinMode(buzzerPin, OUTPUT);

  // RGB LED
  for (int i = 0; i < 2; ++i)
    pinMode(rgb[i], OUTPUT);

  /* Connect to wifi */
  multi.addAP(WIFI_SSID, WIFI_PASSWORD);
  multi.run();

  Serial.print("Connecting to Wi-Fi");

  unsigned long ms = millis();

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);

    if (millis() - ms > 10000) break;
  }

  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Firebase config */
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;

  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  config.database_url = DATABASE_URL;

  // Assign the callback function for the long running token generation task
  config.token_status_callback = tokenStatusCallback;

  Firebase.reconnectNetwork(true);

  // Since v4.4.x, BearSSL engine was used, the SSL buffer need to be set.
  // Large data transmission may require larger RX buffer, otherwise connection issue or data read time out can be occurred.
  fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

  // Limit the size of response payload to be collected in FirebaseData
  fbdo.setResponseSize(2048);

  Firebase.begin(&config, &auth);

  config.wifi.clearAP();
  config.wifi.addAP(WIFI_SSID, WIFI_PASSWORD);

  Firebase.setDoubleDigits(5);

  config.timeout.serverResponse = 10 * 1000;

  /* RTC */
  rtc.adjust(9, 9, 0, 2024, 4, 9);

  ledOff();
}

void loop() {
  if (!Firebase.ready())
    return;

  if (millis() - scanMillis >= scanInterval) {
    scanMillis = millis();

    tiny_code_reader_results_t results = {};

    if (!tiny_code_reader_read(&results)) {
      Serial.println("No results found on the i2c bus");
      ledErr();
      return;
    }

    if (results.content_length == 28) {
      bool access = Firebase.RTDB.getBool(&fbdo, FPSTR(String("/users/" + String((char*)results.content_bytes) + "/access").c_str())) ? fbdo.to<bool>() : false;

      if (access) {
        rtc.read();

        String path = String("/entrances/" + rtc.getTime("%m-%d-%Y/%H"));

        int count = Firebase.RTDB.getInt(&fbdo, F(path.c_str())) ? fbdo.to<int>() + 1 : 0;

        Firebase.RTDB.setInt(&fbdo, F(path.c_str()), count);

        ledOk();
      } else {
        ledErr();
      }

      digitalWrite(buzzerPin, HIGH);
      buzzerMillis = millis();
    }
  }

  // Check for the buzzer delay
  if (millis() - buzzerMillis >= buzzerInterval) {
    digitalWrite(buzzerPin, LOW);
    ledOff();
  }
}
