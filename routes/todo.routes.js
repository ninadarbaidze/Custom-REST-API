const express = require('express');
const todoController = require('../controller/todo.controller');

const router = express.Router();

//get all todos
router.get('/', todoController.getAllTodos);

//post new todos
router.post('/', todoController.addTodo); 

//change specific todo text
router.patch('/:id', todoController.updateTodo);

//delete specific todo
router.delete('/:id', todoController.deleteTodo);


module.exports = router;
