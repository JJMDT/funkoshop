const {getAll} = require('../src/models/product.models')
const mainControllers = {
    
    home: async (req, res) => {
        try {
            const data = await getAll();
            const shuffledData = data.sort(() => Math.random() - 0.5); // Baraja el array

            res.render('index', { data,shuffledData }); // Pasando los datos a la vista 'index'
        } catch (error) {
            console.error('Error :', error);
            res.status(500).send('No se pudo cargar.');
        }
    },
    contact: (req, res) => {
        res.render("contact"); 
      },
    about: (req,res)=> res.send('Route for about view from controllers'),
    faqs: (req,res)=> res.send('Route for faqs view from controllers')
}

module.exports =  mainControllers

