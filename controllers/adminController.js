const { getAll, getOne, create } = require("../src/models/product.models");
const ItemsService = require("../src/service/ItemsService");

const adminControllers = {
  admin: async (req, res) => {
    const pepe = await getAll();

    res.render("admin/admin", { pepe });
  },

  createViews: (req, res) => {
    res.render("admin/create");
  },

  createItem: async (req, res) => {
    try {
      const item = req.body;
      const files = req.files;

      console.log("Files:", files);
      console.log("Items:", item);

      // Llama al servicio correspondiente si es necesario
      await ItemsService.createItem(item, files);

      const product_schema = {
        product_name: req.body.name,
        product_description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        discount: req.body.discount,
        sku: req.body.sku,
        dues: req.body.dues,
        image_front: files[0].originalname,
        image_back: files[1].originalname,
        category_id: req.body.category,
        licence_id: req.body.licence,
      };

      const result = await create([Object.values(product_schema)]);
      console.log("Resultado de la creación:", result);

      res.redirect("/admin/success");
    } catch (error) {
      console.log("Error en createItem:", error);
      // Aquí puedes manejar el error, enviar una respuesta al cliente, etc.
      res.status(500).send("Se produjo un error al crear el producto.");
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;

    const [product] = await getOne(id);

    res.render("admin/edit", { product });
  }, //res.send(`Route for edit id ${req.params.id} from controllers `),
  delete: (req, res) =>
    res.send(`Route for delete  ID ${req.params.id}  from controllers`),
};
module.exports = adminControllers;
