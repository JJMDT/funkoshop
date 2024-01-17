const path = require("path");
const { getAll, getOne } = require("../models/product.models");

const shopControllers = {
  shop: async (req, res) => {
    const data = await getAll();
    const carrito = res.locals.carrito;

    res.render("shop/shop", { data, carrito });
  },
  
  item: async (req, res) => {
    const productId = req.params.id; // Corregir: req.param.id -> req.params.id
    const cantidadSeleccionada = req.body.cantidadSeleccionada;
    const name = req.body.product_name;

    // Lógica para agregar el producto al carrito
    const productoActual = {
      id: productId,
      cantidad: cantidadSeleccionada,
      name: name,
    };

    // Obtener el carrito de la sesión actual o crear uno si no existe
    req.session.carrito = req.session.carrito || [];
    req.session.carrito.push(productoActual);

    // Respuesta al cliente

    try {
      const itemId = req.params.id;

      // Obtiene el producto específico por su ID
      const [item] = await getOne(itemId);

      // Obtén todos los productos si es necesario, o puedes comentar esto si no lo necesitas.
      const data = await getAll();

      // Renderiza la vista "shop/item" pasando el producto específico y todos los datos si los necesitas.
      res.render("shop/item", { item, data });
    } catch (error) {
      console.error("Error en la función item:", error);
      res.status(500).send("Error al obtener el producto.");
    }
  },
  itemAdd: async (req, res) => {
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
