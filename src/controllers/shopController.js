const path = require("path");
//const { getAllItems,getOne } = require("../service/productsServices");
const { getAll, getOne } = require("../models/productModels");

const shopControllers = {
  shop: async (req, res) => {
    const data = await getAll();
    const carrito = req.session.carrito || []
    const sumaQuantity = carrito.reduce((total, item) => total + item.cantidad, 0);

    res.render("shop/shop", { data,sumaQuantity,carrito,
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
      const carrito = req.session.carrito || []
      const sumaQuantity = carrito.reduce((total, item) => total + item.cantidad, 0);
      res.render("shop/item", { product, allProducts, loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name || 'usser',sumaQuantity,carrito });
    } catch (error) {
      console.error("Error en la función item:", error);
      res.status(500).send("Error al obtener el producto.");
    }
  },

  addItemToCart: async (req, res) => {
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
        price: productDetails.price,
        category: productDetails.category_name,
        licence: productDetails.licence_name,
        image: productDetails.image_front,  // Agrega la propiedad de la imagen si está disponible

      };

      // Obtener el carrito de la sesión actual o crear uno si no existe
      req.session.carrito = req.session.carrito || [];
      req.session.carrito.push(productoActual);

      console.log("producto enviado al carrito", productoActual);

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
  removeItemFromCart: (req, res) => {
    const productId = req.params.id;
  
    try {
      // Obtener el carrito de la sesión actual o crear uno si no existe
      req.session.carrito = req.session.carrito || [];
  
      // Encontrar el índice del producto en el carrito
      const index = req.session.carrito.findIndex(producto => producto.id === productId);
  
      if (index !== -1) {
        // Si se encuentra, eliminar el producto del carrito
        req.session.carrito.splice(index, 1);
  
        // Respuesta al cliente
        res.status(200).json({
          success: true,
          message: "Producto eliminado del carrito con éxito",
        });
      } else {
        // Si no se encuentra, devolver un mensaje indicando que el producto no está en el carrito
        res.status(404).json({
          success: false,
          message: "El producto no está en el carrito",
        });
      }
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      res.status(500).json({
        success: false,
        message: "Error al eliminar producto del carrito.",
        error: error.message,
      });
    }
  },  
  cart: async(req, res) => {
    const data = await getAll();
    const carrito = req.session.carrito || []
    const sumaQuantity = carrito.reduce((total, item) => total + item.cantidad, 0);
    const sumaPrecios = carrito.reduce((total, item) => {
      const precio = parseFloat(item.price);
      const cantidad = item.cantidad
      return isNaN(precio) ? total : total + precio*cantidad;
  }, 0);
  const precioTotal=sumaPrecios.toFixed(2)
  console.log(precioTotal)


    console.log("lo que hay en el Carrito de compras:", carrito);
    res.render("shop/carrito",{carrito,sumaQuantity,precioTotal });
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
