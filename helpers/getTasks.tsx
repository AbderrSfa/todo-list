import axios from 'axios';
import Task from './typings';

export const getTasks = async () : Promise<Task[]> => {
	try {
		const res = await axios.get('http://localhost:3000/api/todos');
		return res.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
