const express = require('express');
const routes = express.Router();

// Controller
const RulesController = require('../controllers/rulesController');

routes.post('/', RulesController.AddRules);

routes.get('/', RulesController.GetAllData);

routes.get('/:id', RulesController.GetById);

routes.put('/:id', RulesController.Update);

routes.delete('/:id', RulesController.Delete);

module.exports = routes