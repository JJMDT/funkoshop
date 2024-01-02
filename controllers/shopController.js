const path = require("path");
const {getAll,getOne} = require('../src/models/product.models')
const json = [
    {
      product_id: 1,
      licence_name: "Pokemon",
      category_name: "Figuras coleccionables",
      product_name: "Pidgeotto",
      product_description: "Figura coleccionable pokemon",
      product_price: 1999.99,
      dues: 3,
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
      product_price: 2599.99,
      dues: 6,
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
      product_price: 2999.99,
      dues: 9,
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
      product_price: 3499.99,
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
      dues: 1,
      product_sku: "PKM001005",
      img_front: "../../../public/img/pokemon/vulpix-1.webp",
      img_back: "../../../public/img/pokemon/vulpix-box.webp",
    }, {
      product_id: 6,
      licence_name: "Harry Potter",
      category_name: "Figuras coleccionables",
      product_name: "Harry Potter",
      product_description: "Figura coleccionable Harry Potter",
      product_price: 4999.99,
      dues: 12,
      product_sku: "PKM001005",
      img_front: "../../../public/img/harry-potter/harry-1.webp",
      img_back: "../../../public/img/harry-potter/harry-box.webp"
    },
    {
      product_id: 7,
      licence_name: "Harry Potter",
      category_name: "Figuras coleccionables",
      product_name: "Snape Patronus ",
      product_description: "Figura coleccionable Snape patronus",
      product_price: 4999.99,
      dues: 12,
      product_sku: "PKM001005",
      img_front: "../../../public/img/harry-potter/snape-patronus-1.webp",
      img_back: "../../../public/img/harry-potter/snape-patronus-box.webp"
    }
  ];

 
const shopControllers = {
  shop: async (req, res) => {
    
    const data = await getAll()
 
    res.render("shop/shop", { data });
  },
  item: async (req, res) => {
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
}
,
  itemAdd: (req, res) =>
    res.send(`Route for add the current item to the shop cart`),
  cart: (req, res) => {
    res.render("shop/carrito");
  },
  cartPost: (req, res) => res.send("Route for cart post"),
};
module.exports = shopControllers;
