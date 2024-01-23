const express = require('express');
const path = require('path')
const methodOverride = require('method-override');
// importamos las rutas
const mainRoutes = require('./src/routes/main-routes')
const shopRoutes = require('./src/routes/shopRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors')
const {initSession} = require('./src/utils/session');

const app = express();
const PORT = 3003

const bodyParser = require('body-parser')


//
app.use(initSession())
app.use((req,res,next) =>{
  res.locals.isLogged = req.session.isLogged;
  res.locals.carrito = req.session.carrito || [];
  next();
})

// template engine
app.set('view engine','ejs')
app.set('views', path.join(__dirname,'./src/views'))

//middlewares de configuracion
app.use(express.json()) // nos ahorra de usar JSON.parse() al recibir datos y JSON.stringiy() para enviarlos, nos permite usar req.body
app.use(express.urlencoded()) // nos permite capturar los datos de un formulario con req.body
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));
app.use(cors());



//rutas
app.use('/', mainRoutes)
app.use('/shop', shopRoutes)
app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)


 app.use(bodyParser.json())

//correr el servidor

// user session

app.listen(PORT, () => console.log(`servidor corriendo  http://localhost:${PORT}`));
