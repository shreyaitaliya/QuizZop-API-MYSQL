const express = require('express');
const routes = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// settingController
const SettingController = require('../controllers/settingController');

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

const upload = multer({ storage: storage }).single('logo');

routes.post('/', upload, SettingController.AddSetting);

routes.get('/', SettingController.GetByAllData);

routes.get('/:id', SettingController.GetByID);

routes.put('/:id', upload, SettingController.Update);

routes.delete('/:id', SettingController.Delete);

module.exports = routes