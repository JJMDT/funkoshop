const path = require("path");
const { getAllItems } = require("../service/productsServices");
const { getAll, getOne } = require("../models/productModels");

const shopControllers = {
  shop: async (req, res) => {
    const data = await getAllItems();

    res.render("shop/shop", { data });
  },

  item: async (req, res) => {
    try {
      const itemId = req.params.id;

      // Obtiene el producto específico por su ID
      const [product] = await getOne(itemId);
      const allProducts = await getAll();
      res.render("shop/item", { product,allProducts });
    } catch (error) {
      console.error("Error en la función item:", error);
      res.status(500).send("Error al obtener el producto.");
    }
   
    
},


  itemAddToCart: async (req, res) => {
    const productId = req.param.id;
    const cantidadSeleccionada = req.body.cantidadSeleccionada;

    try {
      //obtener los detalles del producto por su ID
      const [productDetails] = await getOne(productId);
      // verificar si el producto existe en la base de datos
      if (!productDetails) {
        return res
          .status(404)
          .send({ message: " el producto no fue encontrado" });
      }

      //logica para agregar el producto al carrito
      const productoActual = {
        id: productId,
        cantidad: cantidadSeleccionada,
        name: productDetails.product_name,
        description: productDetails.product_description,
        price: productDetails.product_price,
      };
      //obtener el carrito de la sesion actual o crear uno si no existe
      req.session.carrito = req.session.carrito || [];
      req.session.carrito.push(productoActual);

      //respuesta al cliente
      res
        .status(200)
        .send({ message: " producto agregado al carrito con exito" });
    } catch (error) {
      console.error("Error en la función itemAdd:", error);
      res.status(500).send({ message: "Error interno del servidor." });
    }
  },
  cart: (req, res) => {
    res.render("shop/carrito");
  },
  cartPost: (req, res) => res.send("Route for cart post"),
};
module.exports = shopControllers;
