const adminControllers = {
    admin: (req,res) => res.send('Route for admin view from controllers'),
    create:(req,res) => res.send('Route for create get view from controllers'),
    edit: (req,res) => res.send(`Route for edit id ${req.params.id} from controllers `),
    delete: (req,res) => res.send(`Route for delete  ID ${req.params.id}  from controllers`),
 
}
module.exports = adminControllers