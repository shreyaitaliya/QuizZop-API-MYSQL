const express = require('express');

const routes = express.Router();

// CategoryRoute
routes.use('/category', require('./categoryroutes'));

// QuizQuestion Routes
routes.use('/quizque', require('./quizQueroutes'));

// User Routes
routes.use('/user', require('./userRoutes'));

//  User Routes
routes.use('/setting', require('./settingRoutes'));

//  Rules Routes
routes.use('/rules', require('./rulesRoutes'));

//  Footer Routes
routes.use('/footer', require('./footerRoutes'));

//  Login Routes
routes.use('/login', require('./loginRoutes'));


module.exports = routes;      