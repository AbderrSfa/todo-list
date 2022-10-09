import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import * as path from 'path';

import Task from '../../../helpers/typings';

const jsonPath: string = path.join(
	__dirname,
	'../../../../../helpers/todos.json'
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'DELETE') {
		const taskId = req.query.taskId as string;
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		const todosArr: Task[] = JSON.parse(jsonFile);

		const newTodosArr = todosArr.filter((item) => {
			if (item.id !== parseInt(taskId)) return item;
		});

		await fs.writeFile(jsonPath, JSON.stringify(newTodosArr));
		res.status(200).send('success');
	} else if (req.method === 'PATCH') {
		const taskId = req.query.taskId as string;
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		const todosArr: Task[] = JSON.parse(jsonFile);

		const foundTodo: Task | undefined = todosArr.find(
			(task) => task.id === parseInt(taskId)
		);
		if (foundTodo) foundTodo.done = req.body.done;

		await fs.writeFile(jsonPath, JSON.stringify(todosArr));
		res.status(200).send('success');
	} else res.status(400).send('undefined');
}
