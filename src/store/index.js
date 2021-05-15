import Vue from "vue";
import Vuex from "vuex";

import categories from "./modules/categories";
import user from "./modules/user";
import tasks from "./modules/tasks";
import messages from "./modules/messages";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "DüzQoş",
    appUrl: "duzqosh.com",
    appEmail: "duzqosh@gmail.com",
    appPhone: "+1 232 3235 324",
  },
  mutations: {},
  actions: {},
  modules: {
    categories,
    user,
    tasks,
    messages,
  },
});
