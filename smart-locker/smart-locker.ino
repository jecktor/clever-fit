#include <Wire.h>
#include <WiFi.h>

#include <LiquidCrystal_I2C.h>
#include <NewPing.h>

#include <Firebase_ESP_Client.h>

#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

#include "secrets.h"

/* LCD1602 */

const int lcdSCL = 32;
const int lcdSDA = 33;

LiquidCrystal_I2C lcd(0x3F, 16, 2);

/* Ultrasonic sensor */

const int usTrig = 27;
const int usEcho = 26;

const int usMaxDistance = 500;

NewPing sonar(usTrig, usEcho, usMaxDistance);

/* Lock relay */

const int lockPin = 25;

/* Firebase */

FirebaseData fbdo;
FirebaseData stream;

FirebaseAuth auth;
FirebaseConfig config;

/* Flags */

bool unlocked = false;
bool prevItemsCheck;

/* Timers */

unsigned long lockMillis = 0;
unsigned long itemsMillis = 0;

const unsigned long lockInterval = 1000;
const unsigned long itemsInterval = 10000;

/* Utils */

String path = String("/lockers/entries/" + WiFi.macAddress());

void streamCallback(FirebaseStream data) {
  FirebaseJson json = data.jsonObject();
  FirebaseJsonData result;

  if (json.get(result, "open")) {
    unlocked = true;

  } else if (json.get(result, "tenant")) {
    lcd.setCursor(0, 1);

    for (int i = 0; i < 16; ++i)
      lcd.print(" ");

    if (result.stringValue.equals("null"))
      return;

    lcd.setCursor(0, 1);
    lcd.print(result.stringValue);

  } else if (json.get(result, "number")) {
    lcd.setCursor(0, 0);

    for (int i = 0; i < 16; ++i)
      lcd.print(" ");

    lcd.setCursor(0, 0);
    lcd.print('#');
    lcd.print(result.intValue);
  }
}

void streamTimeoutCallback(bool timeout) {
  if (timeout)
    Serial.println("Stream timed out, resuming...\n");

  if (!stream.httpConnected())
    Serial_Printf("Error code: %d, reason: %s\n\n", stream.httpCode(), stream.errorReason().c_str());
}

void lockerSetup() {
  /* Locker number */
  int number = Firebase.RTDB.getInt(&fbdo, F(String(path + "/number").c_str())) ? fbdo.to<int>() : -1;

  if (number == -1) {
    // New locker
    String pending = Firebase.RTDB.getString(&fbdo, F("/lockers/pending")) ? String(fbdo.to<const char *>()) : "";

    if (pending.length() > 0) {
      String left = pending.indexOf(',') != -1 ? pending.substring(pending.indexOf(',') + 1) : "";
      number = pending.substring(0, pending.indexOf(',')).toInt();

      Firebase.RTDB.setString(&fbdo, F("/lockers/pending"), left);
    } else {
      number = Firebase.RTDB.getInt(&fbdo, F("/lockers/total")) ? fbdo.to<int>() + 1 : -1;

      if (number != -1)
        Firebase.RTDB.setInt(&fbdo, F("/lockers/total"), number);
    }

    // Fill new locker fields
    Firebase.RTDB.setInt(&fbdo, F(String(path + "/number").c_str()), number);
    Firebase.RTDB.setBool(&fbdo, F(String(path + "/hasItems").c_str()), false);
    Firebase.RTDB.setBool(&fbdo, F(String(path + "/open").c_str()), false);
    Firebase.RTDB.setString(&fbdo, F(String(path + "/tenant").c_str()), F("null"));

    return;
  }

  const char *tenant = Firebase.RTDB.getString(&fbdo, F(String(path + "/tenant").c_str())) ? fbdo.to<const char *>() : "null";

  /* Update LCD */
  lcd.setCursor(0, 0);
  lcd.print('#');
  lcd.print(number);

  if (strcmp(tenant, "null") == 0)
    return;

  lcd.setCursor(0, 1);
  lcd.print(tenant);
}

void setup() {
  /* Start serial at 115200 baud */
  Serial.begin(115200);

  /* Set i2c pins */

  // LCD1602
  Wire.begin(lcdSDA, lcdSCL);

  /* Set pins */

  // Ultrasonic sensor
  pinMode(usTrig, OUTPUT);
  pinMode(usEcho, INPUT);

  // Lock relay
  pinMode(lockPin, OUTPUT);

  /* Connect to wifi */
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

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

  Firebase.setDoubleDigits(5);

  config.timeout.serverResponse = 10 * 1000;

  if (!Firebase.RTDB.beginStream(&stream, path.c_str()))
    Serial_Printf("Stream begin error, %s\n\n", stream.errorReason().c_str());

  Firebase.RTDB.setStreamCallback(&stream, streamCallback, streamTimeoutCallback);

  /* LCD1602 init */
  lcd.init();
  lcd.backlight();

  lockerSetup();
}

void loop() {
  if (!Firebase.ready())
    return;

  // Check for the items delay
  if (millis() - itemsMillis >= itemsInterval) {
    itemsMillis = millis();

    unsigned int distance = sonar.ping();
    bool hasItems = distance > 1920;

    if (hasItems != prevItemsCheck) {
      prevItemsCheck = hasItems;

      Firebase.RTDB.setBool(&fbdo, F(String(path + "/hasItems").c_str()), hasItems);
    }
  }

  // Check for the lock delay
  if (millis() - lockMillis >= lockInterval) {
    lockMillis = millis();

    if (unlocked) {
      Firebase.RTDB.setInt(&fbdo, F(String(path + "/open").c_str()), false);

      unlocked = false;
    }
  }

  if (unlocked)
    digitalWrite(lockPin, HIGH);
  else
    digitalWrite(lockPin, LOW);
}