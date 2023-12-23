const path = require("path");

const shopControllers = {
  shop: (req, res) => {
    const data = [
      {
        product_id: 1,
        licence_name: "Pokemon",
        category_name: "Figuras coleccionables",
        product_name: "Pidgeotto",
        product_description: "Figura coleccionable pokemon",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001001",
        img_front: "../../../public/img/pokemon/pidgeotto-1.webp",
        img_back: "../../../public/img/pokemon/pidgeotto-box.webp",
      },
      {
        product_id: 2,
        licence_name: "Pokemon",
        category_name: "Figuras coleccionables",
        product_name: "Charmander",
        product_description: "Figura coleccionable pokemon",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001002",
        img_front: "../../../public/img/pokemon/charmander-1.webp",
        img_back: "../../../public/img/pokemon/charmander-box.webp",
      },
      {
        product_id: 3,
        licence_name: "Pokemon",
        category_name: "Figuras coleccionables",
        product_name: "Dragonite",
        product_description: "Figura coleccionable pokemon",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001003",
        img_front: "../../../public/img/pokemon/dragonite-1.webp",
        img_back: "../../../public/img/pokemon/dragonite-box.webp",
      },
      {
        product_id: 4,
        licence_name: "Pokemon",
        category_name: "Figuras coleccionables",
        product_name: "Pikachu",
        product_description: "Figura coleccionable pokemon",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001004",
        img_front: "../../../public/img/pokemon/pikachu-1.webp",
        img_back: "../../../public/img/pokemon/pikachu-box.webp",
      },
      {
        product_id: 5,
        licence_name: "Pokemon",
        category_name: "Figuras coleccionables",
        product_name: "Vulpix",
        product_description: "Figura coleccionable pokemon",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001005",
        img_front: "../../../public/img/pokemon/vulpix-1.webp",
        img_back: "../../../public/img/pokemon/vulpix-box.webp",
      }, {
        product_id: 6,
        licence_name: "Harry Potter",
        category_name: "Figuras coleccionables",
        product_name: "Harry Potter",
        product_description: "Figura coleccionable Harry Potter",
        product_price: 1799.99,
        dues: 10,
        product_sku: "PKM001005",
        img_front: "../../../public/img/harry-potter/harry-1.webp",
        img_back: "../../../public/img/harry-potter/harry-box.webp"
      }
    ];

    res.render("shop/shop", { data });
  },
  item: (req, res) => {
    res.render(`shop/item`);
  }, //res.send(`Route for find and retrieve a product for an ID ${req.params.id}`),
  itemAdd: (req, res) =>
    res.send(`Route for add the current item to the shop cart`),
  cart: (req, res) => {
    res.render("shop/carrito");
  },
  cartPost: (req, res) => res.send("Route for cart post"),
};
module.exports = shopControllers;
