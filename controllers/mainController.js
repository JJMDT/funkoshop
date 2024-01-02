const {getAll} = require('../src/models/product.models')
const mainControllers = {
    
    home: async (req, res) => {
        try {
            const data = await getAll();
            res.render('index', { data }); // Pasando los datos a la vista 'index'
        } catch (error) {
            console.error('Error :', error);
            res.status(500).send('No se pudo cargar.');
        }
    },
    contact: (req,res)=> res.send('Route for contact view from controllers'),
    about: (req,res)=> res.send('Route for about view from controllers'),
    faqs: (req,res)=> res.send('Route for faqs view from controllers')
}

module.exports =  mainControllers