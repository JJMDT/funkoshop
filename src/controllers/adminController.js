const {getAll,getOne,create,deleteProduct,editProduct} = require('../models/product.models')
const ItemsService = require('../service/ItemsService');


const adminControllers = {
  
    admin: async (req, res) => {
        const username = req.session.name;
        const products = await getAll()
       
    
        res.render('admin/admin', { products , username:username});
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
            
            res.redirect('/admin');
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
                image_front: '/products/' + req.files[0].filename,
                image_back: '/products/' + req.files[1].filename,
                category_id: Number(req.body.category),
                licence_id: Number(req.body.licence)
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
                licence_id: Number(req.body.licence)
            };
    
            // Asumiendo que tienes una función editProduct definida en product.models
            await editProduct(item_schema, id);
    
            res.redirect('/admin');
        } catch (error) {
            console.log('Error en editProduct:', error);
            res.status(500).send('Se produjo un error al editar el producto.');
        }
    },
    

    delete: async (req,res) => {

        const {id} = req.params
        await deleteProduct({ product_id:id})
        res.redirect('/admin')
    }
 
}
module.exports = adminControllers