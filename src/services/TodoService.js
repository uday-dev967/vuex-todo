import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getTodos() {
    return apiClient.get("/todos");
  },
  getTodo(id) {
    return apiClient.get("/todos/" + id);
  },
  postTodo(todo) {
    return apiClient.post("/todos", todo);
  },
  deleteTodo(id) {
    return apiClient.delete("/todos/" + id);
  },
  updateFinishedTodo(todo) {
    return apiClient.put("/todos/" + todo.id, todo);
  },
  updateIncompleteTodo(todo) {
    return apiClient.put("/todos/" + todo.id, todo);
  },
};
