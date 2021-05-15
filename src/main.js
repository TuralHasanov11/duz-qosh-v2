import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Vuelidate from "vuelidate";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
require('@/store/subscriber');
import DeadlineFilter from './filters/deadline';

Vue.config.productionTip = false;

// Form Validation
Vue.use(Vuelidate);

// BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// CSS
import "./assets/css/admin.css";

// JS
import "./assets/js/admin";

// Axios Requests
axios.defaults.baseURL = "https://34.90.26.163:8443/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Filters
Vue.filter('deadlineFilter', DeadlineFilter);


// Progress Bar
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});


// App
store.dispatch("user/attempt", localStorage.getItem('id_token'))
  .then((res) => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
});
