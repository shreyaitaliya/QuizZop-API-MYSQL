const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UserController = require('../controllers/userController')

// Multer
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

const upload = multer({ storage: storage }).single('image');

// Routes
routes.post('/', upload, UserController.AddUser);

routes.get('/', UserController.ViewData);

routes.get('/:id', UserController.GetByID);

routes.put('/:id', upload, UserController.Update);

routes.delete('/:id', UserController.Delete);

module.exports = routes