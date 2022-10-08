const fs = require('fs').promises;
const path = require('path');
const jsonPath = path.join(__dirname, '../../../../helpers/todos.json');

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const newTodo = req.body.title;
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		const todosArr = JSON.parse(jsonFile);

		let lastElement;
		if (todosArr.length === 0) lastElement = 0;
		else lastElement = todosArr.at(todosArr.length - 1).id;

		todosArr.push({ id: lastElement + 1, title: newTodo, done: false });

		await fs.writeFile(jsonPath, JSON.stringify(todosArr));
		res.status(200).send('success');
	} else {
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		res.status(200).send(JSON.parse(jsonFile));
	}
}
