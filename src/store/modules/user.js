import LoginService from "@/services/loginService.js";

export const namespaced = true;

export const state = {
  user: {},
  isLoggedIn: false,
  error: {
    isError: false,
    errMsg: "",
  },
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOG(state, status) {
    state.isLoggedIn = status;
  },
  SET_ERROR(state, errObj) {
    state.error = errObj;
  },
};
export const actions = {
  fetchUsers({ commit }, creds) {
    LoginService.getUsers()
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (eachuser) =>
            eachuser.email === creds.email &&
            eachuser.password === creds.password
        );

        if (user) {
          console.log(user, "user");
          commit("SET_USER", user);
          commit("SET_LOG", true);
          commit("SET_ERROR", { isError: false, errMsg: "" });
        } else {
          throw new Error(
            "Your Credintials does not match with any existing users"
          );
        }
      })
      .catch((error) => {
        commit("SET_ERROR", { isError: true, errMsg: error });
      });
  },
  logout({ commit }) {
    commit("SET_LOG", false);
    commit("SET_USER", {});
  },
};

export const getters = {
  getUser(state) {
    return state.user;
  },
  getLoggedInStatus(state) {
    return state.isLoggedIn;
  },
};
