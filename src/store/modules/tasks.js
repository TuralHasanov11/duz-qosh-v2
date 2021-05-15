import axios from "axios";
import faker from './faker';


const state = {
  tasks: [],
  task: {},
  tasksPerPage: 3,
};

const mutations = {
  SET_TASKS(state, data) {
    state.tasks = data;
  },

  SET_TASK(state, data) {
    state.task = data;
  },

  REMOVE_TASK(state,data){
    state.tasks.splice(state.tasks.find((el)=>{
      return el.id == data;
    }),1);
  }

};

const actions = {
 

  async fetchTasks({ commit, state }, page=1) {
    commit("SET_TASKS", []);
    const res = await axios.get(`tasks/home-page?page=${page}&size=${state.tasksPerPage}`);
    commit("SET_TASKS", res.data);
    // setTimeout(() => {
    //   commit("SET_TASKS", faker.tasks.slice((page-1)*state.tasksPerPage,page*state.tasksPerPage));
    // }, 1000);
  },


  async fetchTask({ commit }, id) {
    commit('SET_TASK', {});

    let res = await axios.get(`tasks/${id}`);
    commit('SET_TASK', res.data.task);

    // commit('SET_TASK', faker.tasks[0]);
  },

  async deleteTask({ commit }, data) {
    
    try {
      let res = await axios.delete(`tasks/${data.id}`);
      commit('SET_TASK', {});
      commit('REMOVE_TASK', data.id);
      return res;
    }catch(e){
      return e;
    }
    
  },

  async updateTask({ commit }, data) {
    let res = await axios.put("tasks", data);
    return res;
  },

};

const getters = {
  tasks(state) {
    return state.tasks;
  },

  pagination(state){
    return {
      tasksPerPage: state.tasksPerPage,
    };
  },
  
  task(state) {
    return state.task;
  },

};

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
};
