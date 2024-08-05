import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, setTaskToEdit } from '../store/actions/actions';
import noTask from "../assets/no-task.svg"
const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = id => {
    dispatch(deleteTask(id));
  };

  const handleEdit = task => {
    dispatch(setTaskToEdit(task));
  };
  console.log(tasks)
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-violet-900">Task List</h2>
      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center p-4 border rounded-md">
            <div>
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEdit(task)} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Edit</button>
              <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete</button>
            </div>
          </li>
        ))}
        {tasks.length === 0 ? <div className='text-center'>
          <img src={noTask} />
          <h4 className='text-xl p-10 text-violet-900'>No tasks, go out for a walk!</h4>
        </div> : null}
      </ul>
    </div>
  );
};

export default TaskList;
