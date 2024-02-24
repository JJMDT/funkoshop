const { getAllLicences } = require("../service/licencesServices");
//const { getAllItems } = require("../service/productsServices");
const { getAll, getCategory } = require("../models/productModels");



module.exports = {
  home: async (req, res) => {
    try {
      //   const licen = data.sort(() => Math.random() - 0.5); // Baraja el array
    //  const licences = await getAllLicences();
      const items = await getAll();
      const licences = await getAllLicences();
      const itemsRandom = [...items].sort(() => Math.random() - 0.5); // ordena de forma aleatoria el array
      const mostRecent = [...items].sort((a,b)=> b.product_id - a.product_id ); // ordena por id, de mayor a menor 
      const carrito = req.session.carrito || []
      const sumaQuantity = carrito.reduce((total, item) => total + item.cantidad, 0);
      const categorias = await getCategory();


      res.render("home", { items,itemsRandom,mostRecent,licences,categorias,loggedin: req.session.loggedin , // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name,sumaQuantity,carrito }); // Pasando los datos a la vista 'index'
      
    } catch (error) {
        if(items.isError  ){
      console.error("Error :", error);
      return res.status(500).send('Hemos tenido un error al consultar los datos')
        }
    }
  },
  contact: async(req, res)=>{
    const carrito = req.session.carrito || []
    const sumaQuantity = carrito.reduce((total, item) => total + item.cantidad, 0);
    const categorias = await getCategory();

    res.render('contact',{categorias,sumaQuantity})
  },

  about: (req, res) => res.send("Route for about view from controllers"),
  faqs: (req, res) => res.send("Route for faqs view from controllers"),
};
