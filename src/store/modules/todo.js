import TodoService from "@/services/TodoService";

export const namespaced = true;

export const state = {
  todos: [],
};
export const mutations = {
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  SET_TODO(state, todo) {
    state.todo = todo;
  },
  DELETE_TODO(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
  UPDATE_FINISH(state, updatedTodo) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.status = "finished";
      }
      return todo;
    });
  },
  UPDATE_INCOMPLETE(state, updatedTodo) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo.status = "incomplete";
      }
      return todo;
    });
  },
};
export const actions = {
  createTodo({ commit }, todo) {
    return TodoService.postTodo(todo).then(() => commit("ADD_TODO", todo));
  },
  deleteTodo({ commit }, id) {
    console.log(id);
    return TodoService.deleteTodo(id).then(() => commit("DELETE_TODO", id));
  },
  updateFinished({ commit }, todo) {
    return TodoService.updateFinishedTodo(todo).then(() =>
      commit("UPDATE_FINISH", todo)
    );
  },
  updateIncomplete({ commit }, todo) {
    return TodoService.updateIncompleteTodo(todo).then(() =>
      commit("UPDATE_INCOMPLETE", todo)
    );
  },
  fetchTodos({ commit }) {
    TodoService.getTodos()
      .then((response) => {
        commit("SET_TODOS", response.data);
      })
      .catch((error) => {
        console.log("There was an error:", error.response);
      });
  },
  fetchTodo({ commit }, id) {
    var todo = getters.getTodoById(id);

    if (todo) {
      commit("SET_TODO", todo);
      console.log(todo, "todo");
    } else {
      TodoService.getTodo(id)
        .then((response) => {
          console.log(response.data, "data");
          commit("SET_TODO", response.data);
        })
        .catch((error) => {
          console.log("There is an error while fetching todo:", error.response);
        });
    }
  },
};
export const getters = {
  getTodoById: (id) => {
    console.log(state, "state");
    console.log(
      state.todos.find((todo) => todo.id === id),
      "my todo"
    );
    return state.todos.find((todo) => todo.id === id);
  },
  getFilteredTodos: (state, getters, rootState) => {
    console.log("hi");
    console.log(state, "state");
    return state.todos.filter((todo) =>
      todo.title
        .toLowerCase()
        .includes(rootState.search.searchInput.toLowerCase())
    );
  },
  getTodos(state) {
    return state.todos;
  },
};
