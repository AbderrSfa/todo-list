import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faCheckRegular } from '@fortawesome/free-regular-svg-icons';
import Task from '../helpers/typings';

type Props = {
	taskList: Task[];
	handleDelete: (id: number) => Promise<void>;
	handleComplete: (id: number, done: boolean) => Promise<void>;
};

const TaskList = ({ taskList, handleDelete, handleComplete }: Props) => {
	return (
		<div className='mt-8 w-full'>
			{taskList.map((task) => {
				const { id, title, done } = task;
				return (
					<article key={id} className='flex justify-between my-4'>
						{done ? (
							<p className='text-xl font-medium line-through'>{title}</p>
						) : (
							<p className='text-xl font-medium'>{title}</p>
						)}
						<div className='ml-4'>
							<button type='button'>
								{done ? (
									<FontAwesomeIcon
										icon={faCircleCheck}
										className='text-green-600 w-6 mr-2'
										onClick={() => handleComplete(id, false)}
									/>
								) : (
									<FontAwesomeIcon
										icon={faCheckRegular}
										className='text-green-600 w-6 mr-2'
										onClick={() => handleComplete(id, true)}
									/>
								)}
							</button>
							<button
								className='text-red-700 w-6'
								type='button'
								onClick={() => handleDelete(id)}
							>
								<FontAwesomeIcon icon={faTrash} />
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default TaskList;
