const path = require("path");
//const { getAllItems,getOne } = require("../service/productsServices");
const { getAll, getOne } = require("../models/productModels");

const shopControllers = {
  shop: async (req, res) => {
    const data = await getAll();

    res.render("shop/shop", { data,
      loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name || 'usser' // Asegúrate de que name esté definida, incluso si es una cadena vacía
    });
  },

  item: async (req, res) => {
    try {
      const itemId = req.params.id;
      // extrae el primer elemento de  getOne(itemId)
      const [product] = await getOne(itemId);
      // con allproducts obtenemos todos los productos desde getAll()
      const allProducts = await getAll();
      // renderizamos la pagina de shop/item y pasamos product y allproduct para poder usarlos en las vista de item
      res.render("shop/item", { product, allProducts, loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name || 'usser' });
    } catch (error) {
      console.error("Error en la función item:", error);
      res.status(500).send("Error al obtener el producto.");
    }
  },

  addItemToCart: async (req, res) => {
    console.log("producto enviado al carrito");
    const productId = req.params.id; // Cambiar de req.param.id a req.params.id
    const cantidadSeleccionada = req.body.cantidadSeleccionada;

    try {
      // Obtener los detalles del producto por su ID
      const [productDetails] = await getOne(productId);

      // Verificar si el producto existe en la base de datos
      if (!productDetails) {
        return res
          .status(404)
          .send({ message: "El producto no fue encontrado" });
      }

      // Lógica para agregar el producto al carrito
      const productoActual = {
        id: productId,
        cantidad: cantidadSeleccionada,
        name: productDetails.product_name,
        description: productDetails.product_description,
        price: productDetails.product_price,
        image: productDetails.product_image, // Agrega la propiedad de la imagen si está disponible

      };

      // Obtener el carrito de la sesión actual o crear uno si no existe
      req.session.carrito = req.session.carrito || [];
      req.session.carrito.push(productoActual);

      // Respuesta al cliente
      res
  .status(200)
  .json({
    success: true,
    message: "Producto agregado al carrito con éxito",
    redirectTo: "/shop", // Agregar la URL a la que deseas redirigir
  });
    } catch (error) {
      console.error("Error en la función addItemToCart:", error);
      res
        .status(500)
        .send({
          success: false,
          message: "Error al agregar producto al carrito.",
          error: error.message,
        });
    }
  },

  cart: (req, res) => {
    console.log("Carrito de compras:", req.session.carrito);
    res.render("shop/carrito");
  },
  clearCart: (req, res) => {
    try {
      // Lógica para vaciar el carrito
      req.session.carrito = [];

      // Respuesta al cliente
      res.status(200).send({
        success: true,
        message: "Carrito vaciado con éxito",
      });
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      res.status(500).send({
        success: false,
        message: "Error al vaciar el carrito.",
        error: error.message,
      });
    }
  },

  cartPost: (req, res) => res.send("Route for cart post"),
};
module.exports = shopControllers;
