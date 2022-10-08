const fs = require('fs').promises;
const path = require('path');
const jsonPath = path.join(__dirname, '../../../../../helpers/todos.json');

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		const { taskId } = req.query;
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		const todosArr = JSON.parse(jsonFile);

		const newTodosArr = todosArr.filter((item) => {
			if (item.id !== parseInt(taskId)) return item;
		});

		await fs.writeFile(jsonPath, JSON.stringify(newTodosArr));
		res.status(200).send('success');
	} else if (req.method === 'PATCH') {
		const { taskId } = req.query;
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		const todosArr = JSON.parse(jsonFile);

		todosArr.find((task) => task.id === parseInt(taskId)).done = req.body.done;

		await fs.writeFile(jsonPath, JSON.stringify(todosArr));
		res.status(200).send('success');
	} else res.status(400).send('undefined');
}
