const session= require('express-session');
const {conn} = require('../config/conn');
const mysqlStore = require('express-mysql-session')(session);
require('dotenv').config();  // habilita a usar las variables en nuestra conexion, estan en el archivo .env


//declaramos nuestra BBDD como store para almacernar las sesiones
const sessionStore = new mysqlStore({

}, conn);


module.exports = {
    // inicializa y configura la session
    initSession: () => {
        return session({
            secret:process.env.SESSION_NAME ,//"mySecretKey", // clave secreta compartida entre el servidor y el cliente para proteger la integridad de las cookies de sesión
            resave: false,
            saveUninitialized: false,
            store: sessionStore, // Almacenamos las sesiones en la base de datos
            rolling: true,
            cookie: {
                maxAge: 600000 // tiempo que dura la sesion en milisegundos
            },
        });
    },
};


// const cookieSession = require('cookie-session');

// module.exports = {
//   // Inicializa y configura la sesión
//   initSession: () => {
//     return cookieSession({
//       secret: 'session', // Nombre de la cookie
//       keys: ['mySecretKey'], // Claves secretas para firmar la cookie
//       maxAge: 600000, // Tiempo que dura la sesión en milisegundos
//       httpOnly: true, // Evita que la cookie sea accesible a través del navegador
//       sameSite: 'strict', // Refuerza la política de mismo sitio
//       secure: process.env.NODE_ENV === 'production', // Configura para "true" en producción para habilitar cookies seguras (HTTPS)
//     });
//   },
// };
