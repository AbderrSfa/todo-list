const express = require('express');
const router = express.Router();

const { getTodos, createTodo, deleteTodo, completeTodo } = require('../controllers/todos');

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').delete(deleteTodo).patch(completeTodo);

module.exports = router;