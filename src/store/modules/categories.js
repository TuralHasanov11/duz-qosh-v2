import axios from "axios";
import faker from './faker';

const state = {
  categories: [],
  category: {},
  tasksPerPage: 10
};

const mutations = {

  SET_CATEGORIES(state, data) {
    state.categories = data;
  },

  SET_CATEGORY(state, data) {
    state.category = state.categories.find((el)=>{
      return el.id == data;
    });
  },

  SET_CATEGORY_TASKS(state, data) {
    state.category.tasks = data;
  },

};

const actions = {

  async fetchCategories({ commit }) {
    const res = await axios.get("categories");
    commit("SET_CATEGORIES", res.data);
    // commit("SET_CATEGORIES", faker.categories);
  },

  async fetchCategory({ commit, state }, {id, page}) {
    commit("SET_CATEGORY", {});

    const res = await axios.get(`tasks?categoryId.equals=${id}&page=${page}&size=${state.tasksPerPage}`);

    if(state.category.id == id){
      commit('SET_CATEGORY', id);
    }
    commit("SET_CATEGORY_TASKS", res.data);
  },

};

const getters = {
  categories(state) {
    return state.categories;
  },
  category(state) {
    return state.category;
  },
  
  pagination(state){
    return {
      tasksPerPage: state.tasksPerPage
    }
  }
};

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
};
