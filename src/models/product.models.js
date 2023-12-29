const { conn } = require("../config/conn");

const getAll = async () => {
try {
  const [rows] = await conn.query(`select p.*,c.category_name,l.licence_name from (product as p
  left join category as c  on p.category_id = c.category_id)
  left join licence as l on p.licence_id = l.licence_id  ;`);
  return rows;
  
} catch (error) {
  console.log('se produjo un error ' + error)
}finally{
  conn.releaseConnection()
}
};

const getOne = async (id) => {
  try {
    const [rows] = await conn.query(`select * from product as p
    inner join licence as l  on p.licence_id = l.licence_id where product_id = ? ;`, id);
    return rows;
    
  } catch (error) {
    console.log('se produjo un error ' + error)
  }finally{
    conn.releaseConnection()
  }
}

module.exports = {
  getAll,
  getOne
};
