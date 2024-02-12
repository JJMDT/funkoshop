const express = require('express')
const router = express.Router();
const shopControllers = require('../controllers/shopController')

// shopRoutes
router.get('/', shopControllers.shop)
router.get('/item/:id',shopControllers.item) 

router.post('/item/:id/add', shopControllers.addItemToCart);
router.get('/cart',shopControllers.cart)
router.post('/cart',shopControllers.cartPost)
router.post('/cart/clear', shopControllers.clearCart);
router.delete('/cart/remove/:id', shopControllers.removeItemFromCart);

module.exports = router;

