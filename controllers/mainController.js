const mainControllers = {
    
    home: (req,res)=> {
        res.render('index');

    },
    contact: (req,res)=> res.send('Route for contact view from controllers'),
    about: (req,res)=> res.send('Route for about view from controllers'),
    faqs: (req,res)=> res.send('Route for faqs view from controllers')
}

module.exports =  mainControllers