import Vue from "vue";
import Vuex from "vuex";
import * as todo from "@/store/modules/todo.js";
import * as user from "@/store/modules/user.js";
import * as search from "@/store/modules/search.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todo,
    user,
    search,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
