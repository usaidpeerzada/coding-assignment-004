const initialState = {
  tasks: [],
  taskToEdit: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TASKS":
      return { ...state, tasks: action.payload };
    case "CREATE_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        taskToEdit: null,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "SET_TASK_TO_EDIT":
      return { ...state, taskToEdit: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
