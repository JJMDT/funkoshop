const express = require("express");
const router = express.Router();
const adminControllers = require("../../controllers/adminController");
const upload = require("../middlewares/uploadFiles");

// esta pagina es /admin
router.get("/", adminControllers.admin);
router.get("/create", adminControllers.createViews);
router.get("/edit/:id", adminControllers.edit);
router.post("/create", upload.array("images"), adminControllers.createItem);
router.put("/edit/:id", (req, res) => res.send("Route for edite put view"));
router.delete("/delete/:id", adminControllers.delete);
router.get("/success", (req, res) => {
  res.render("admin/success"); // Aquí renderizas tu página de éxito.
});

module.exports = router;
