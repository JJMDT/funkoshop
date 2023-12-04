const shopControllers={
    shop:(req,res) => res.send('Route for shop view'),
    item:(req,res) => res.send(`Route for find and retrieve a product for an ID ${req.params.id}`),
    itemAdd: (req,res) => res.send(`Route for add the current item to the shop cart`),
    cart:(req,res) => res.send('Route for cart'),
    cartPost:(req,res) => res.send('Route for cart post')
}
module.exports = shopControllers