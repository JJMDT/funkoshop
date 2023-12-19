const express= require('express')
const router = express.Router()
const authControllers = require('../../controllers/authController')



router.get('/login', authControllers.login)
router.post('/login',(req,res) => res.send(' page login '))
router.get('/register',authControllers.register)
router.post('/register',(req,res) => res.send(' page register post '))
router.get('/logout',(req,res) => res.send(' page logout '))

module.exports = router 