

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/img/products')),
    filename: (req, file, cb) => cb(null, file.fieldname + '-' + `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

module.exports = upload;
