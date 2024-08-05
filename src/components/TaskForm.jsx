import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../store/actions/actions';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const taskToEdit = useSelector(state => state.taskToEdit);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setIsEditing(true);
      setTaskId(taskToEdit._id);
    }
  }, [taskToEdit]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) {
      setErr("Required fields can't be empty!")
      return;
    }
    if (isEditing) {
      dispatch(updateTask(taskId, { title, description }));
    } else {
      dispatch(createTask({ title, description }));
    }
    setErr('')
    setTitle('');
    setDescription('');
    setIsEditing(false);
    setTaskId(null);
  }

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-violet-900">{isEditing ? 'Update Task' : 'Create Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-violet-900"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md border-violet-900"
        />
        {err ? <p className='text-center text-bold text-red-600'>{err}</p> : null}
        <button type="submit" className="w-full bg-violet-800 text-white py-2 rounded-md hover:bg-violet-600">
          {isEditing ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
