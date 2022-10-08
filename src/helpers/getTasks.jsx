import axios from 'axios';

export const getTasks = async () => {
	try {
		const res = await axios.get('http://localhost:3000/api/todos');
		return res.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};
