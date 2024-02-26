// importamos las librerias que vamos a utilizar
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const cors = require("cors");
const { initSession } = require("./src/utils/session");
const bodyParser = require("body-parser");

// importamos las rutas
const mainRoutes = require("./src/routes/main-routes");
const shopRoutes = require("./src/routes/shopRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const authRoutes = require("./src/routes/authRoutes");

// creamos instancia expres
const app = express();
//configuramos el puerto en que va a iniciar el servidor
const PORT = 3003;

// Configuramos el middleware de análisis del cuerpo de la solicitud (body-parser)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// template engine (configuramos la vista y la ubicacion de la carpeta views)
app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "./src/views"));
app.set('views', path.resolve(__dirname, './src/views')); // agregamos path para Vercel

// inicializamos la sesion y configuramos variables locales
app.use(initSession());
app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  res.locals.carrito = req.session.carrito || [];
  next();
});

// configuramos middlewares
//app.use(express.json()); // nos ahorra de usar JSON.parse() al recibir datos y JSON.stringiy() para enviarlos, nos permite usar req.body
//app.use(express.urlencoded()); // nos permite capturar los datos de un formulario con req.body
app.use(methodOverride("_method")); // middleware para usar verbos HTTP como PUT o DELETE
//app.use("/public", express.static("public")); // archivos estaticos desde la carpeta public
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cors()); //configuracion de cors

// configuracion de las rutas
app.use("/", mainRoutes);
app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);



// iniciamos el servidor
app.listen(PORT, () =>
  console.log(`servidor corriendo  http://localhost:${PORT}`)
);
