const fs = require('fs').promises;
const { parse } = require('path');
const path = require('path');

const jsonPath = path.join(__dirname, '../db/todos.json');

const getTodos = async (req, res) => {
	const jsonFile = await fs.readFile(jsonPath, 'utf-8');
	res.status(200).send(JSON.parse(jsonFile));
};

const createTodo = async (req, res) => {
	const newTodo = req.body.title;
	const jsonFile = await fs.readFile(jsonPath, 'utf-8');
	const todosArr = JSON.parse(jsonFile);

	let lastElement;
	if (todosArr.length === 0) lastElement = 0;
	else lastElement = todosArr.at(todosArr.length - 1).id;

	todosArr.push({ id: lastElement + 1, title: newTodo, done: false });

	await fs.writeFile(jsonPath, JSON.stringify(todosArr));
	res.status(200).send('success');
};

const deleteTodo = async (req, res) => {
	const { id } = req.params;
	const jsonFile = await fs.readFile(jsonPath, 'utf-8');
	const todosArr = JSON.parse(jsonFile);

	const newTodosArr = todosArr.filter((item) => {
		if (item.id !== parseInt(id)) return item;
	});

	await fs.writeFile(jsonPath, JSON.stringify(newTodosArr));
	res.status(200).send('success');
};

const completeTodo = async (req, res) => {
	const { id } = req.params;
	const jsonFile = await fs.readFile(jsonPath, 'utf-8');
	const todosArr = JSON.parse(jsonFile);

	todosArr.find((task) => task.id === parseInt(id)).done = req.body.done;

	await fs.writeFile(jsonPath, JSON.stringify(todosArr));
	res.status(200).send('success');
};

module.exports = { getTodos, createTodo, deleteTodo, completeTodo };
