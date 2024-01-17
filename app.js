const express = require('express');
const app = express();
const {engine} = require('express-handlebars')

const bodyParser = require('body-parser')
const loginRoutes = require('./src/controllers/authController')
const session = require('express-session');

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

const PORT = 3003
const methodOverride = require('method-override');
const path = require('path')
// importamos las rutas
const mainRoutes = require('./src/routes/main-routes')
const shopRoutes = require('./src/routes/shopRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const authRoutes = require('./src/routes/authRoutes');


app.set('view engine','ejs')
app.set('views', path.join(__dirname,'./src/views'))

app.use(express.urlencoded())
app.use(express.json())
app.use(methodOverride('_method'))
app.use('/public', express.static('public'));

app.use('/', mainRoutes)
app.use('/shop', shopRoutes)
app.use('/admin', adminRoutes)
app.use('/auth', authRoutes)

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())


app.listen(PORT, () => console.log(`servidor corriendo en el puerto http://localhost:${PORT}`));
