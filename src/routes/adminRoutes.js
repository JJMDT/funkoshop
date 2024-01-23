const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const upload = require("../middlewares/uploadFiles");



// esta pagina es /admin
router.get("/", adminControllers.admin);
router.get("/create", adminControllers.createViews);
router.post("/create", upload.array("images"), adminControllers.createItem);
router.get("/edit/:id",  adminControllers.editView);
router.put("/edit/:id", upload.array("images"), adminControllers.editProduct);
router.delete("/delete/:id", adminControllers.delete);

module.exports = router;