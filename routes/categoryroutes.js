const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const categoryController = require('../controllers/categoryController');

// multer
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// multer     
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// routes
routes.post('/', upload.single('image'), categoryController.AddCategory);

routes.get('/', categoryController.ViewCategory);    

routes.get('/:id', categoryController.GetByID);

routes.put('/:id', upload.single('image'), categoryController.Update);

routes.delete('/:id', categoryController.Delete);

module.exports = routes