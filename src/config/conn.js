// importamos mysql 
const mysql = require('mysql2');
require('dotenv').config();  // habilita a usar las variables en nuestra conexion, estan en el archivo .env

//creamos la conexion con la base de datos y la guardamos en pool
const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBSCHEMA,
    waitForConnections: true,
    connectionLimit: 0,
    queueLimit: 0,
   // Promise: require('bluebird') // Esto es para usar bluebird como la biblioteca de promesas
});

// nos conectamos a la base de datos para verificar la conexion
pool.getConnection((err,conn)=>{
    if(err){
        console.log("error al coenctar con la base de datos, algo salio mal" + err);
    }else{
        console.log("conexion a la base de datos exitosa");
        conn.release() //liberamos la conexion 
    }
});

// exportamos la conexion para usarla en otros archivos
module.exports={
    conn: pool.promise()
}
