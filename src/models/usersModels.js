const {conn} = require('../config/conn');

module.exports={
  getAll: async()=>{
    try {
      const [rows] = await conn.query('SELECT * FROM user')
    } catch (error) {
      console.log("Error al consultar los datos " + error)
    } finally{
      conn.releaseConnection()
    }
  },
}