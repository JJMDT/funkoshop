const { conn } = require("../config/conn");

module.exports = {
  //categorias
  getCategory:async() =>{
    try {
      const [rows] = await conn.query(' select * from category');
      return rows
    } catch (error) {
      console.log('se produjo un error al obtener las categorias', error)
    }
  },
  //licencias
  getLicences:async() =>{
    try {
      const [rows] = await conn.query(' select * from licence');
      return rows
    } catch (error) {
      console.log('se produjo un error al obtener las licencias', error)
    }
  },
  //categoryxlicence

  getCategoryxLicence:async(params) => {
    //const categoryId = 1; // Reemplaza 123 con el valor real de category_id
    const res = await conn.query('SELECT c.category_id, c.category_name, l.licence_name FROM category_licence AS cl INNER JOIN category AS c ON c.category_id = cl.category_id INNER JOIN licence AS l ON l.licence_id = cl.licence_id');
    
    console.log(res)
    return res
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
  getOneCategory: async(params) =>{
    
      try {
        const [rows] = await conn.query(
          `select * from category where category_id = ?`,
          params
        );
        return rows;
      } catch (error) {
        console.log("Error al consultar los datos " + error);
      } finally {
        conn.releaseConnection();
      }
 
  },
  getOneLicence: async(params) =>{
    try {
      const oneLicence = await conn.query('SELECT * FROM licence where licence_id = ?', params)
      return oneLicence
    } catch (error) {
      console.log("Error al consultar los datos " + error);
    }
  },
  //crear un nuevo producto
  create: async (params) => {
    try {
      console.log("Descripción del producto:", params[0].product_description);

      const [product] = await conn.query(
       "INSERT INTO product ( product_name, product_description, price, stock,discount, sku, dues, image_front, image_back, category_id, licence_id) values ?",
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
  },
  editLicence: async(params, id) => {
    try {
      const licence = await conn.query('UPDATE licence SET  ? where ?', [params, {licence_id : id}])
    return licence
    } catch (error) {
      console.log(error)
    }
  }
  ,
  createCategory: async(params) =>{
   try {
    const [category] = await conn.query('INSERT INTO category (category_name,category_description) VALUES ?', [params])
    return category
   } catch (error) {
    console.log('error:', error)
   }
  },

  //editar categoria
  editCategory:async(params,id)=>{
 try {
  const  category = await conn.query('UPDATE category SET ? where ?',[params, {category_id : id}])
  return category
 } catch (error) {
  console.log("error",error)
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
