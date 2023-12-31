const {getAll,getOne,create,deleteProduct} = require('../src/models/product.models')
const ItemsService = require('../src/service/ItemsService');


const adminControllers = {
  
    admin: async (req, res) => {
    
        const pepe = await getAll()
    
        res.render('admin/admin', { pepe });
      },
    
    createViews:(req,res) =>{
        res.render('admin/create')
    },

    createItem: async (req, res) => {
        try {
            const item = req.body;
            const files = req.files;

            const product_schema = {
                product_name: req.body.name,
                product_description: req.body.description,
                price: Number(req.body.price),
                stock: Number(req.body.stock),
                discount: Number(req.body.discount),
                sku: req.body.sku,
                dues: Number(req.body.dues),
                image_front: '/products/'+ req.files[0].filename,
                image_back: '/products/'+ req.files[1].filename,
                category_id: Number(req.body.category),
                licence_id: Number(req.body.licence)
            };
            await ItemsService.createItem(item, files);

            const result = await create([Object.values(product_schema)]);
            console.log('Resultado de la creación:', result);
            
            res.redirect('/admin/success');
        } catch (error) {
            console.log('Error en createItem:', error);
            // Aquí puedes manejar el error, enviar una respuesta al cliente, etc.
            res.status(500).send('Se produjo un error al crear el producto.');
        }
    },

    editView: async (req,res) => {
       const {id} = req.params;

        const [product] = await getOne(id)

        res.render('admin/edit',{product})

    }, //res.send(`Route for edit id ${req.params.id} from controllers `),
    editItem: async (req,res) => {
      console.log("vista:",req.body)
      console.log("vista files:", req.files)

      res.send('la vista para editar un item especifico')

    }, //res.send(`Route for edit id ${req.params.id} from controllers `),
    delete: async (req,res) => {

        const {id} = req.params
        await deleteProduct({ product_id:id})
        res.redirect('/admin')
    }
 
}
module.exports = adminControllers