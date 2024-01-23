const session= require('express-session');
const {conn} = require('../config/conn');
const mysqlStore = require('express-mysql-session')(session);
//declaramos nuestra BBDD como store
const sessionStore = new mysqlStore({

}, conn);


// module.exports = {
//     initSession:()=>{
//         return session({
//             // la session se guarda solo si hay cambios
            
//             secret:"mySecretKey",
//             resave:false,
//             saveUninitialized:false,

//             //usamos como store la bbdd
//             store:sessionStore,
//             //para reiniciar el tiempo de expiracion en cada solicitud
//             rolling:true,

//             cookie:{
//                 maxAge:5*60*1000, // 5 minutos en milisegundos
//             },
            
//         })
//     },
// }
module.exports = {
    initSession: () => {
        return session({
            secret: "mySecretKey",
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            rolling: true,
            cookie: {
                maxAge: 60000 
            },
        });
    },
};
