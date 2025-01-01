const express = require('express');
const routes = express.Router();

const LoginController = require('../controllers/loginController');

routes.post('/', LoginController.Login);


module.exports = routes