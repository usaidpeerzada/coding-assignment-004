import axios from "axios";

export const fetchTasks = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8080/tasks");
  dispatch({ type: "FETCH_TASKS", payload: response.data });
};

export const createTask = (task) => async (dispatch) => {
  const response = await axios.post("http://localhost:8080/tasks", task);
  dispatch({ type: "CREATE_TASK", payload: response.data });
};

export const updateTask = (id, task) => async (dispatch) => {
  const response = await axios.put(`http://localhost:8080/tasks/${id}`, task);
  dispatch({ type: "UPDATE_TASK", payload: response.data });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:8080/tasks/${id}`);
  dispatch({ type: "DELETE_TASK", payload: id });
};

export const setTaskToEdit = (task) => ({
  type: "SET_TASK_TO_EDIT",
  payload: task,
});
