const {validator, validationResult} = require('express-validator')

module.exports = {
    validateInput: (req,res,next)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            // almacena los errores en el objero req
            req.session.validationErrors = errors.array()
        }
        next();
    },
}