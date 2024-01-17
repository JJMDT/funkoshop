const express = require('express')
const router = express.Router();
const shopControllers = require('../controllers/shopController')
const isLogged = require('../routes/adminRoutes')

router.use((req,res,next) =>{
    //hacer que la sesion este disponible en todas las rutas
    res.locals.carrito = req.session.carrito || [];
    next();
})

router.get('/', shopControllers.shop)
router.get('/item/:id',shopControllers.item) //router.get('/item:id',shopControllers.item)

router.post('/item/:id/add',shopControllers.itemAdd)
router.get('/cart',shopControllers.cart)
router.post('/cart',shopControllers.cartPost)

module.exports = router;

