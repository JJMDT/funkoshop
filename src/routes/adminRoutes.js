const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminController");
const upload = require("../middlewares/uploadFiles");



// adminRoutes
router.get("/", adminControllers.admin);
router.get("/profile", adminControllers.profile);
router.get("/create", adminControllers.createViews);
// Cambiado a `upload.fields` para manejar múltiples campos
router.post("/create", upload.fields([{ name: 'image_front', maxCount: 1 }, { name: 'image_back', maxCount: 1 }]), adminControllers.createItem);

router.get("/edit/:id",  adminControllers.editView);
router.put("/edit/:id", upload.array('images'), adminControllers.editProduct);
router.delete("/delete/:id", adminControllers.delete);
router.get('/createLicence', adminControllers.createLicenceGet)
router.post('/createLicence', adminControllers.createLicencePost)
router.get('/createCategory',adminControllers.createCategoryGet)
router.post('/createCategory', adminControllers.createCategoryPost)

router.get("/editCategory/:id", adminControllers.editCategoryView)
router.put("/editCategory/:id", adminControllers.editCategory)

router.get("/editLicence/:id", adminControllers.editLicenceView)
router.put("/editLicence/:id", adminControllers.editLicence)

module.exports = router;