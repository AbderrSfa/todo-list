import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import * as path from 'path';

import Task from '../../../helpers/typings';

const jsonPath: string = path.join(__dirname, '../../../../helpers/todos.json');

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const newTodo: string = req.body.title;
		const jsonFile: string = await fs.readFile(jsonPath, 'utf-8');
		const todosArr: Task[] = JSON.parse(jsonFile);

		const lastElement: Task | undefined = todosArr.at(todosArr.length - 1);
		let lastElementIndex;
		if (lastElement) lastElementIndex = lastElement.id;
		else lastElementIndex = 0;

		todosArr.push({ id: lastElementIndex + 1, title: newTodo, done: false });

		await fs.writeFile(jsonPath, JSON.stringify(todosArr));
		res.status(200).send('success');
	} else {
		const jsonFile = await fs.readFile(jsonPath, 'utf-8');
		res.status(200).send(JSON.parse(jsonFile));
	}
}
