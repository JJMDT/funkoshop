const { conn } = require('../config/conn');

module.exports = {

    getAll: async () => {
        try {
            const [rows] = await conn.query(`select p.*,c.category_name,l.* from (product as p
                left join category as c  on p.category_id = c.category_id)
                left join licence as l on p.licence_id = l.licence_id  ;`);
            return rows;
        } catch (error) {
           console.log(" error al consultar los datos "+ error)
        }
        finally {
            conn.releaseConnection();
        }
    },

};