const express = require('express')
const router = express.Router();
const mainControllers = require('../../controllers/mainController')
const isLogged = require('../routes/adminRoutes')

// Main Routes
router.get('/',isLogged, mainControllers.home)
router.get('/home',isLogged, mainControllers.home)
router.get('/contact',mainControllers.contact)
router.get('/about',mainControllers.about)
router.get('/faqs',mainControllers.faqs)


module.exports = router
