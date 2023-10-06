export const namespaced = true;

export const state = {
  searchInput: "",
};

export const mutations = {
  SET_SEARCH_INPUT(state, input) {
    state.searchInput = input;
  },
};
export const actions = {
  changeSearchInput({ commit }, userInput) {
    commit("SET_SEARCH_INPUT", userInput);
  },
};
