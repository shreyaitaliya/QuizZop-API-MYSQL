const express = require('express');
const routes = express.Router();

const QuizQueController = require('../controllers/quizQueController')

//Routes
routes.post('/', QuizQueController.AddData);

routes.get('/', QuizQueController.ViewData);

routes.get('/:id', QuizQueController.GetByID);

routes.put('/:id', QuizQueController.Update);

routes.delete('/:id', QuizQueController.Delete);

routes.get('/categoryfilter/:categoryId', QuizQueController.GetQuestionsByCategory);

module.exports = routes