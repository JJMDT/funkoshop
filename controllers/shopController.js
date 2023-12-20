const path = require('path');

const shopControllers={
    shop:(req,res) => {
        res.render('shop/shop')
    },
    item:(req,res) => {
        res.render(`shop/item`)
    }, //res.send(`Route for find and retrieve a product for an ID ${req.params.id}`),
    itemAdd: (req,res) => res.send(`Route for add the current item to the shop cart`),
    cart:(req,res) => {
        res.render('shop/carrito')
    },
    cartPost:(req,res) => res.send('Route for cart post')
}
module.exports = shopControllers