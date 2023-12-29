const {getAll} = require('../src/models/product.models')

const adminControllers = {
  
    admin: async (req, res) => {
    
        const pepe = await getAll()
        console.log(pepe)
    
        res.render('admin/admin', { pepe });
      },
    
    create:(req,res) =>{
        res.render('admin/create')
    },
    edit: (req,res) => {
        res.render('admin/edit')
    },//res.send(`Route for edit id ${req.params.id} from controllers `),
    delete: (req,res) => res.send(`Route for delete  ID ${req.params.id}  from controllers`),
 
}
module.exports = adminControllers