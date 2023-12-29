const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'funko_shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    Promise: require('bluebird') // Esto es para usar bluebird como la biblioteca de promesas
});


pool.getConnection((err,conn)=>{
    if(err){
        console.log("error al coenctar con la base de datos, algo salio mal" + err);
    }else{
        console.log("coneccion a la base de datos exitosa");
        conn.release()
    }
});

module.exports={
    conn: pool.promise()
}
