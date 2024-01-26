const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const upload = require("../middlewares/uploadFiles");



// adminRoutes
router.get("/", adminControllers.admin);
router.get("/profile", adminControllers.profile);
router.get("/create", adminControllers.createViews);
router.post("/create", upload.array("images"), adminControllers.createItem);
router.get("/edit/:id",  adminControllers.editView);
router.put("/edit/:id", upload.array("images"), adminControllers.editProduct);
router.delete("/delete/:id", adminControllers.delete);
router.get('/createLicence', adminControllers.createLicenceGet)
router.post('/createLicence', adminControllers.createLicencePost)
router.get('/createCategory',adminControllers.createCategoryGet)

module.exports = router;