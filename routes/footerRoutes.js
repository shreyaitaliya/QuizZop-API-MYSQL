const express = require('express');
const routes = express.Router();

const footerController = require('../controllers/footerController');

routes.post('/', footerController.AddData);

routes.get('/all_data', footerController.GetAllData);

routes.get('/:id', footerController.GetById);

routes.put('/:id', footerController.Update);

routes.delete('/:id', footerController.Delete);

routes.get('/', footerController.GetByList);


module.exports = routes