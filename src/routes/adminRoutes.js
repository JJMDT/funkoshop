const express = require("express");
const router = express.Router();
const adminControllers = require("../../controllers/adminController");
const upload = require("../middlewares/uploadFiles");


const isLogged = (req, res, next) => {
  console.log("Middleware isLogged activado");
  console.log("req.session:", req.session);
  
  if (req.session && req.session.isLogged) {
    console.log("El usuario está logueado");
    next();
  } else {
    console.log("El usuario NO está logueado");
    res.send('Tienes que loguearte');
  }
};


// esta pagina es /admin
router.get("/", adminControllers.admin);
router.get("/create", isLogged, adminControllers.createViews);
router.get("/edit/:id",  adminControllers.editView);
router.post("/create", upload.array("images"), adminControllers.createItem);
router.put("/edit/:id",upload.array("images"), adminControllers.editProduct);
router.delete("/delete/:id", adminControllers.delete);
router.get("/success", (req, res) => {
  res.render("admin/success"); // Aquí renderizas tu página de éxito.
});

module.exports = router,isLogged;
