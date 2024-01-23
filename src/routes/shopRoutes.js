const express = require('express')
const router = express.Router();
const shopControllers = require('../controllers/shopController')
const {isLogged} = require('../middlewares/auth')



router.get('/', shopControllers.shop)
router.get('/item/:id',shopControllers.item) //router.get('/item:id',shopControllers.item)

router.post('/item/:id/add', shopControllers.addItemToCart);
router.get('/cart',shopControllers.cart)
router.post('/cart',shopControllers.cartPost)
router.post('/cart/clear', shopControllers.clearCart);

module.exports = router;

