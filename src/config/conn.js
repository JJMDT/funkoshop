const mysql = require('mysql2');
require('dotenv').config();  // habilita a usar las variables que estan en el archivo .env


const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBSCHEMA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
   // Promise: require('bluebird') // Esto es para usar bluebird como la biblioteca de promesas
});


pool.getConnection((err,conn)=>{
    if(err){
        console.log("error al coenctar con la base de datos, algo salio mal" + err);
    }else{
        console.log("conexion a la base de datos exitosa");
        conn.release()
    }
});

module.exports={
    conn: pool.promise()
}
