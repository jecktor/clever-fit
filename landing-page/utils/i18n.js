import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  resources: {
    en: {
      translation: {
        menu: {
          access: "Gym access",
          lockers: "Smart lockers",
          dashboard: "Admin dashboard",
          us: "Why us?",
          team: "Our team",
        },
        hero: {
          title: "Welcome to the future of gym management",
          subtitle:
            "Revolutionize your gym experience and streamline your service with our smart security solutions.",
        },
        access: {
          title: "Our Innovative Gym QR Door Lock System",
          subtitle:
            "Experience hassle-free entry with CleverFit's Gym QR Door Lock System. Scan a QR code from your smartphone for a seamless check-in process. No more fumbling with access cards or worrying about lost keys. – focus on what truly matters: your workout.",
        },
        lockers: {
          title: "Elevate Your Gym Experience with Smart Lockers",
          secure: {
            title: "Secure, Convenient, and Smart",
            subtitle:
              "Upgrade your locker experience with CleverFit's Smart Locker Service. Control your locker directly from your smartphone and enjoy the convenience of secure, keyless access.",
          },
          mobile: {
            title: "Mobile App Integration",
            subtitle:
              "Our Smart Lockers are integrated with our mobile app, allowing you to manage your locker from anywhere. Reserve, open, and lock your locker with just a few taps.",
          },
          assign: {
            title: "Seamless Locker Assignment",
            subtitle:
              "Our system automatically assigns you a locker upon check-in. No more searching for an available locker or worrying about your belongings.",
          },
          smart: {
            title: "Smart Monitoring for items",
            subtitle:
              "Our Smart Locker Service now includes Intelligent Item Detection, ensuring an extra layer of security for your valuables.",
          },
        },
        dashboard: {
          title: "Admin Dashboard for Gym Personnel",
          subtitle:
            "CleverFit doesn't just enhance the member experience – it simplifies gym operations too.",
          operations: {
            title: "Streamline Operations",
            subtitle:
              "The intelligent admin dashboard empowers gym personnel to manage monthly payments, check locker statuses, and keep a detailed record of member entrances.",
          },
          management: {
            title: "Locker Management",
            subtitle:
              "Keep track of user activities and enhance security with a comprehensive record of member entrances. The admin dashboard allows for efficient monitoring and ensures a secure gym environment.",
          },
          payment: {
            title: "Payment Management",
            subtitle:
              "Simplify monthly payments with the integrated admin dashboard. Monitor and manage member subscriptions effortlessly, making financial operations more transparent and efficient.",
          },
        },
        us: {
          title: "Why CleverFit?",
          security: {
            title: "Future-Proof Your Gym",
            subtitle:
              "CleverFit's commitment to innovation means we are constantly enhancing your gym experience. We're paving the way for the future of fitness security.",
          },
          satisfaction: {
            title: "Enhance Member Satisfaction",
            subtitle:
              "Invest in member satisfaction and peace of mind with CleverFit's intelligent locker solutions. We prioritize not only your security but also the convenience and flexibility you deserve.",
          },
          workflows: {
            title: "Streamline Workflows",
            subtitle:
              "Our smart security solutions simplify gym operations, allowing gym personnel to focus on what truly matters: providing a seamless and enjoyable experience for members.",
          },
        },
        team: {
          title: "Meet Our Team",
        },
      },
    },
    es: {
      translation: {
        menu: {
          access: "Acceso al gimnasio",
          lockers: "Taquillas inteligentes",
          dashboard: "Panel de administración",
          us: "¿Por qué nosotros?",
          team: "Nuestro equipo",
        },
        hero: {
          title: "Bienvenido al futuro de la gestión de gimnasios",
          subtitle:
            "Revoluciona tu experiencia en el gimnasio y simplifica tu servicio con nuestras soluciones de seguridad inteligente.",
        },
        access: {
          title:
            "Nuestro innovador sistema de cerradura de puerta con QR para gimnasios",
          subtitle:
            "Experimenta un ingreso sin complicaciones con el sistema de cerradura de puerta con QR de CleverFit. Escanea un código QR desde tu smartphone para un proceso de registro sin problemas. No más problemas con las tarjetas de acceso o preocupaciones por las llaves perdidas. – concéntrate en lo que realmente importa: tu entrenamiento.",
        },
        lockers: {
          title:
            "Eleva tu experiencia en el gimnasio con taquillas inteligentes",
          secure: {
            title: "Seguro, conveniente e inteligente",
            subtitle:
              "Mejora tu experiencia con taquillas con el servicio de Taquillas Inteligentes de CleverFit. Controla tu taquilla directamente desde tu smartphone y disfruta de la conveniencia de un acceso seguro y sin llave.",
          },
          mobile: {
            title: "Integración con aplicación móvil",
            subtitle:
              "Nuestras Taquillas Inteligentes están integradas con nuestra aplicación móvil, lo que te permite gestionar tu taquilla desde cualquier lugar. Reserva, abre y cierra tu taquilla con solo unos pocos toques.",
          },
          assign: {
            title: "Asignación de taquillas sin problemas",
            subtitle:
              "Nuestro sistema te asigna automáticamente una taquilla al registrarte. No más buscar una taquilla disponible o preocuparte por tus pertenencias.",
          },
          smart: {
            title: "Monitoreo inteligente de objetos",
            subtitle:
              "Nuestro Servicio de Taquillas Inteligentes ahora incluye Detección Inteligente de Objetos, garantizando una capa adicional de seguridad para tus objetos de valor.",
          },
        },
        dashboard: {
          title: "Panel de administración para personal del gimnasio",
          subtitle:
            "CleverFit no solo mejora la experiencia de los miembros, también simplifica las operaciones del gimnasio.",
          operations: {
            title: "Optimización de operaciones",
            subtitle:
              "El panel de administración inteligente permite al personal del gimnasio gestionar los pagos mensuales, verificar el estado de las taquillas y mantener un registro detallado de los ingresos de los miembros.",
          },
          management: {
            title: "Gestión de taquillas",
            subtitle:
              "Realiza un seguimiento de las actividades de los usuarios y mejora la seguridad con un registro completo de los ingresos de los miembros. El panel de administración permite un monitoreo eficiente y garantiza un entorno seguro en el gimnasio.",
          },
          payment: {
            title: "Gestión de pagos",
            subtitle:
              "Simplifica los pagos mensuales con el panel de administración integrado. Supervisa y gestiona las suscripciones de los miembros sin esfuerzo, haciendo que las operaciones financieras sean más transparentes y eficientes.",
          },
        },
        us: {
          title: "¿Por qué CleverFit?",
          security: {
            title: "Garantiza el futuro de tu gimnasio",
            subtitle:
              "El compromiso de CleverFit con la innovación significa que estamos mejorando constantemente tu experiencia en el gimnasio. Estamos allanando el camino para el futuro de la seguridad en el fitness.",
          },
          satisfaction: {
            title: "Mejora la satisfacción de los miembros",
            subtitle:
              "Invierte en la satisfacción y tranquilidad de los miembros con las soluciones de taquillas inteligentes de CleverFit. Priorizamos no solo tu seguridad, sino también la conveniencia y flexibilidad que mereces.",
          },
          workflows: {
            title: "Optimiza los flujos de trabajo",
            subtitle:
              "Nuestras soluciones de seguridad inteligente simplifican las operaciones del gimnasio, permitiendo que el personal del gimnasio se centre en lo que realmente importa: proporcionar una experiencia fluida y agradable para los miembros.",
          },
        },
        team: {
          title: "Conoce a nuestro equipo",
        },
      },
    },
  },
});

/**
 * @param {string} key
 */
export const t = (key) => i18next.t(key);

export const switchLanguage = () => {
  i18next.changeLanguage(i18next.language === "en" ? "es" : "en");
  window.location.reload();
};
