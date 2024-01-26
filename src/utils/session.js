const session= require('express-session');
const {conn} = require('../config/conn');
const mysqlStore = require('express-mysql-session')(session);

//declaramos nuestra BBDD como store para almacernar las sesiones
const sessionStore = new mysqlStore({

}, conn);


module.exports = {
    // inicializa y configura la session
    initSession: () => {
        return session({
            secret: "mySecretKey", // clave secreta compartida entre el servidor y el cliente para proteger la integridad de las cookies de sesión
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
