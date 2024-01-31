//const { getAllItems, getOne } = require("../service/productsServices");

// const { getAllLicences } = require("../service/licencesServices");
// const {getAll} = require('../models/productModels')
//const ItemsService = require("../service/ItemsService");

const {
  getAll,
  getOne,
  create,
  editProduct,
  deleteProduct,
  
  createLicence,
  createCategory,
  getOneLicence,
  getLicences,
  editLicence,
  getCategory,
  editCategory,
  getOneCategory,

  getCategoryxLicence

} = require("../models/productModels");

module.exports = {
  admin: async (req, res) => {
    try {
      const items = await getAll();
      const licences= await getLicences();
      const category= await getCategory();

      let viewType = req.query.viewType || "product"; // Obtén el valor de viewType desde la consulta (query)

      return res.render("admin/admin", { 
        products: items,
        licences,
        category,
        viewType,
        loggedin: req.session.loggedin || false,
        name: req.session.name || "usser",
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).send("Error en el servidor");
    }
  },
  profile: async (req, res) => {
    res.render("admin/profile", {
      loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name || "usser",
    });
  },
  createViews: async (req, res) => {
    const products = await getAll();
    const licences= await getLicences();
    const category = await getCategory();
    res.render("admin/create", {
      products,licences,category,
      loggedin: req.session.loggedin || false, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name || "usser",
    });
  },
  // post
  createItem: async (req, res) => {
    try {
      const image_front = req.files['image_front'] ? req.files['image_front'][0] : null;
      const image_back = req.files['image_back'] ? req.files['image_back'][0] : null;

        let product_schema = {
            product_name: req.body.name,
            product_description: req.body.description,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            discount: Number(req.body.discount),
            sku: req.body.sku,
            dues: Number(req.body.dues),
            image_front: image_front ? "/products/" + image_front.filename : "/default/no_image_front.jpg",
            image_back: image_back ? "/products/" + image_back.filename : "/default/no_image_back.jpg",
            category_id: Number(req.body.category),
            licence_id: Number(req.body.licence),
          };
          if (image_front === null || image_back === null) {
            throw new Error("No se proporcionaron imágenes válidas");
        }

        const result = await create([Object.values(product_schema)]);

        console.log("Resultado de la creación:", result);

        res.redirect("/admin");
    } catch (error) {
        console.log("Error en createItem:", error);
        res.status(500).send("Se produjo un error al crear el producto.");
    }
},


  editView: async (req, res) => {
    const { id } = req.params;

    const [product] = await getOne(id);
    

    res.render("admin/edit", {
      product,
      loggedin: req.session.loggedin, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name,
    });
  }, //res.send(`Route for edit id ${req.params.id} from controllers `),
  editProduct: async (req, res) => {
    try {
      console.log(req.params);
      console.log(req.body);

      const { id } = req.params;

      // Verificar si hay archivos adjuntos
      const haveImage = req.files && req.files.length !== 0;

      const item_schema = haveImage
        ? {
            product_name: req.body.name,
            product_description: req.body.product_description,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            discount: Number(req.body.discount),
            sku: req.body.sku,
            dues: Number(req.body.dues),
            image_front: "/products/" + req.files[0].filename,
            image_back: "/products/" + req.files[1].filename,
            category_id: Number(req.body.category),
            licence_id: Number(req.body.licence),
          }
        : {
            product_name: req.body.name,
            product_description: req.body.product_description,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            discount: Number(req.body.discount),
            sku: req.body.sku,
            dues: Number(req.body.dues),
            category_id: Number(req.body.category),
            licence_id: Number(req.body.licence),
          };

      //  función editProduct definida en product.models
      await editProduct(item_schema, id);

      res.redirect("/admin");
    } catch (error) {
      console.log("Error en editProduct:", error);
      res.status(500).send("Se produjo un error al editar el producto.");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    await deleteProduct({ product_id: id });
    res.redirect("/admin");
  },

  createLicenceGet: async (req, res) => {
    try {
      res.render("admin/createLicence", {
        loggedin: req.session.loggedin ,
        name: req.session.name 
      });
    } catch (error) {
      console.log("se produjo un error :" + error);
    }
  },
  createLicencePost: async (req, res) => {
    try {
      console.log(req.body)
      const newLicence = {
        licence_name: req.body.licence_name,
        licence_description: req.body.licence_description
      };
      
       const result = await createLicence([Object.values(newLicence)]);
       console.log("Resultado de la creación de la licencia:", result);
       res.redirect('/admin')
    } catch (error) {
      console.log('Se produjo un error:', error);
      res.status(500).send("Se produjo un error al crear la licencia.");
    }
  }
,  
  createCategoryGet: async (req, res) => {
    try {
      res.render("admin/createCategory", {
        loggedin: req.session.loggedin,
        name: req.session.name,
      });
    } catch (error) {
      console.log("se produjo un error" + error);
    }
  },
  createCategoryPost: async(req,res)=>{
    try {
      const newCategory = {
        category_name: req.body.category_name,
        category_description: req.body.category_description
      }
      const result = await createCategory([Object.values(newCategory)])
      console.log('el resultado de la nueva categoria ' , result )
      res.redirect("/admin/?viewType=category");
      } catch (error) {
      console.log(error)
    }
  },
  editCategoryView: async (req, res) => {
    const { id } = req.params;

    const [category] = await getOneCategory(id);
    

    res.render("admin/editCategory", {
      category,
      loggedin: req.session.loggedin, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name,
    });
  },
  editCategory: async(req,res)=>{
  try {
 
    const { id } = req.params;

    const editCateg =  {
         category_name: req.body.name,
          category_description: req.body.category_description,
        }
    //  función editProduct definida en product.models
    await editCategory(editCateg, id);

    res.redirect("/admin/?viewType=category");
  } catch (error) {
    console.log("Error en editProduct:", error);
    res.status(500).send("Se produjo un error al editar el producto.");
  }
  },

  editLicenceView:async(req,res)=>{
    
    const { id } = req.params;

    const [licence] = await getOneLicence(id);
    
    console.log("Licence details:", licence);

    res.render("admin/editLicence", {
      licence,
      loggedin: req.session.loggedin, // Asegúrate de que loggedin esté definida, incluso si es falsa
      name: req.session.name,
    });

  },
  editLicence: async(req,res)=>{
    try {
    console.log(req.body);
      const { id } = req.params;
  
      const editLic =  {
           licence_name: req.body.name,
            licence_description: req.body.licence_description,
          }
      //  función editProduct definida en product.models
      await editLicence(editLic, id);
  
      res.redirect("/admin/?viewType=licence");
    } catch (error) {
      console.log("Error en editLicence:", error);
      res.status(500).send("Se produjo un error al editar la licencia.");
    }
    },
}
