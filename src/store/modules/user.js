import axios from "axios";

const state = {
  id_token: null,
  userRole: null,
  user:null,

  roles: {
    admin: "ROLE_ADMIN,ROLE_USER",
    user: "ROLE_USER"
  },

};

const getters = {
  isAuthenticated(state){
    return state.id_token && state.user;
  },

  user(state){
    return state.user;
  },

  isAdmin(state) {
    return state.id_token && state.user && state.userRole === "admin";
  },
 
};

const mutations = {

  SET_TOKEN(state, data) {
    state.id_token = data;
    if(data){
      let decodedToken = data.split(".")[1];
      decodedToken = JSON.parse(atob(decodedToken));
      for (const key in state.roles) {
        if (state.roles[key] == decodedToken.auth) {
          state.userRole = key;
          break;
        }
      }
    }
  },

  SET_USER(state,data){
    state.user=data;
  },

};

const actions = {

  async login({dispatch }, data) {
    
    let res = await axios.post("authenticate", data);

    return dispatch('attempt', res.data.id_token);
  },

  async attempt({commit, state}, token){
    if(token){
      commit("SET_TOKEN", token);
    }
    
    if(!state.id_token){
      return;
    }

    try {
      let res = await axios.get("user");

      commit("SET_USER", res.data);
      return res;
    } catch (e) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
      return e;
    }
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
      resolve(true);
    });
  },

  async fetchUser({ commit }) {
    let res = await axios.get("api/users/current");
    commit("SET_USER", res.data);
  },

};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
