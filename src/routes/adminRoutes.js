const express = require('express')
const router = express.Router()
const adminControllers = require('../../controllers/adminController')

// esta pagina es /admin
router.get('/', adminControllers.admin)
router.get('/create', adminControllers.create)
router.post('/create', (req,res) => res.send('Route for create post view'))
router.get('/edit/:id',adminControllers.edit)
router.put('/edit/:id', (req,res) => res.send('Route for edite put view'))
router.delete('/delete/:id', adminControllers.delete)



module.exports = router 