const adminControllers = {
    admin: (req, res) => {
        res.render('admin/admin');  // Esta es la ruta relativa a tu directorio de vistas
    }
    ,
    create:(req,res) =>{
        res.render('admin/create')
    },
    edit: (req,res) => {
        res.render('admin/edit')
    },//res.send(`Route for edit id ${req.params.id} from controllers `),
    delete: (req,res) => res.send(`Route for delete  ID ${req.params.id}  from controllers`),
 
}
module.exports = adminControllers