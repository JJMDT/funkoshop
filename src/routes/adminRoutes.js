const express = require("express");
const router = express.Router();
const adminControllers = require("../../controllers/adminController");
const upload = require("../middlewares/uploadFiles");


const isLogged = (req, res, next) => {
  const username= req.session.name;
  req.session.loggedin
  
  console.log("Middleware isLogged activado");
  console.log("req.session:", req.session);
  
  if (req.session && req.session.loggedin) {
    console.log("El usuario está logueado");
   console.log(username)
   console.log(req.session.loggedin)
    next();
  } else {
    console.log("El usuario NO está logueado");
    console.log(req.session.loggedin)

    res.send(`debes logearte <a href="/auth/login">  haz click </a>`);
  }
};


// esta pagina es /admin
router.get("/",isLogged, adminControllers.admin);
router.get("/create", isLogged, adminControllers.createViews);
router.get("/edit/:id",isLogged,  adminControllers.editView);
router.post("/create",isLogged, upload.array("images"), adminControllers.createItem);
router.put("/edit/:id",isLogged, upload.array("images"), adminControllers.editProduct);
router.delete("/delete/:id",isLogged, adminControllers.delete);
router.get("/success", (req, res) => {
  res.render("admin/success"); // Aquí renderizas tu página de éxito.
});

module.exports = router,isLogged;
