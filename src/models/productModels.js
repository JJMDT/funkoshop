const { conn } = require("../config/conn");

module.exports = {
  //licencias
  getLicences:async() =>{
    try {
      const [rows] = await conn.query(' select licence_name from licence');
      return rows
    } catch (error) {
      console.log('se produjo un error al obtener las licencias', error)
    }
  },
  //muestra todos los productos
  getAll: async () => {
    try {
      const [rows] = await conn.query(`select p.*,c.*,l.* from (product as p
  inner join category as c  on p.category_id = c.category_id)
  inner join licence as l on p.licence_id = l.licence_id order by p.product_id  ;`);
      return rows;
    } catch (error) {
      console.log("Error al consultar los datos " + error);
    } finally {
      conn.releaseConnection();
    }
  },

  //muestra solo 1 producto
  getOne: async (params) => {
    try {
      const [rows] = await conn.query(
        `select p.*,c.category_name,l.* from (product as p
        left join category as c  on p.category_id = c.category_id)
        left join licence as l on p.licence_id = l.licence_id where p.product_id= ?`,
        params
      );
      return rows;
    } catch (error) {
      console.log("Error al consultar los datos " + error);
    } finally {
      conn.releaseConnection();
    }
  },

  //crear un nuevo producto
  create: async (params) => {
    try {
      console.log("Descripción del producto:", params[0].product_description);

      const [product] = await conn.query(
        "INSERT INTO product ( product_name, product_description, price, stock,discount, sku, dues, image_front, image_back, category_id, licence_id) values ?;",
        [params]
      );

      return product;
    } catch (error) {
      console.log(" error ! " + error);
    } finally {
      conn.releaseConnection();
    }
  },

  //editar un producto
  editProduct: async (params, id) => {
    try {
      console.log("ID del producto a editar:", id);

      console.log("exitoso");

      const [product] = await conn.query("update product set ? where ? ", [
        params,
        { product_id: id },
      ]);

      return product;
    } catch (error) {
      console.log(" error ! " + error);
    } finally {
      conn.releaseConnection();
    }
  },

  //borrar un producto
  deleteProduct: async (params) => {
    try {
      const [product] = await conn.query(
        "delete from product where  ?",
        params
      );
      return product;
    } catch (error) {
      console.log(" error ! " + error);
    } finally {
      conn.releaseConnection();
    }
  },
  createLicence: async (params) => {
    try {
    
      console.log('nombre de la licencia', params[0].licence_name)
      const [licence] = await conn.query('INSERT INTO licence (licence_name, licence_description) VALUES ?;', [params]);
      console.log(licence)
      return licence
    } catch (error) {
      console.log('se produjo un error: ' + error)
    }
  }
};

// module.exports = {
//   getAll,
//   getOne,
//   create,
//   deleteProduct,
//   editProduct
// };
