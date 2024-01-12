const { conn } = require("../config/conn");

const getAll = async () => {
  try {
    const [rows] =
      await conn.query(`select p.*,c.category_name,l.* from (product as p
  left join category as c  on p.category_id = c.category_id)
  left join licence as l on p.licence_id = l.licence_id  ;`);
    return rows;
  } catch (error) {
    console.log("se produjo un error " + error);
  } finally {
    conn.releaseConnection();
  }
};

const getOne = async (id) => {
  try {
    const [rows] = await conn.query(
      `select * from product as p
    inner join licence as l  on p.licence_id = l.licence_id where product_id = ? ;`,
      id
    );
    return rows;
  } catch (error) {
    console.log("se produjo un error " + error);
  } finally {
    conn.releaseConnection();
  }
};
const create = async (params) => {
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
};
const editProduct = async (params,id) => {
  try {
    console.log('ID del producto a editar:', id);

    console.log("exitoso")

    const [product] = await conn.query(
      "update product set ? where ? ",[params, { product_id: id }]
    );

    return product;
  } catch (error) {
    console.log(" error ! " + error);
  } finally {
    conn.releaseConnection();
  }
};

const deleteProduct = async (params) => {
  try {
    const [product] = await conn.query ('delete from product where  ?', params)
    return product
  } catch (error) {
    console.log(" error ! " + error);

  }  finally {
    conn.releaseConnection();
 }
}


module.exports = {
  getAll,
  getOne,
  create,
  deleteProduct,
  editProduct
};
