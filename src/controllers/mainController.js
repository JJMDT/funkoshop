const { getAllLicences } = require("../service/licencesServices");
const { getAllItems } = require("../service/productsServices");

module.exports = {
  home: async (req, res) => {
    try {
      //   const licen = data.sort(() => Math.random() - 0.5); // Baraja el array
    //  const licences = await getAllLicences();
      const items = await getAllItems();
      const licences = await getAllLicences();
      const itemsRandom = [...items].sort(() => Math.random() - 0.5); // ordena de forma aleatoria el array
      const mostRecent = [...items].sort((a,b)=> b.product_id - a.product_id ); // ordena por id, de mayor a menor 


      res.render("index", { items,itemsRandom,mostRecent,licences }); // Pasando los datos a la vista 'index'
      console.log(items)
    } catch (error) {
        if(items.isError  ){
      console.error("Error :", error);
      return res.status(500).send('Hemos tenido un error al consultar los datos')
        }
    }
  },
  contact: (req, res) => res.send("Route for about view from controllers"),
  about: (req, res) => res.send("Route for about view from controllers"),
  faqs: (req, res) => res.send("Route for faqs view from controllers"),
};
