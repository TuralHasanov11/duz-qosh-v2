import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

import Login from "../views/auth/Login.vue";

// Admin Pages
import Admin from "../views/admin/Admin.vue";
import AdminDashboard from "../views/admin/Dashboard.vue";
import AdminTasks from "../views/admin/tasks/Index.vue";
import AdminTasksShow from "../views/admin/tasks/Show.vue";
import AdminTasksEdit from "../views/admin/tasks/Edit.vue";
import AdminUsers from "../views/admin/users/Index.vue";
import AdminUsersShow from "../views/admin/users/Show.vue";
import AdminCategories from "../views/admin/categories/Index.vue";

Vue.use(VueRouter);

const routes = [

  // Admin Routes
  {
    path: "/",
    name:'Admin',
    component: Admin,
    children: [
      { path: "", name:'AdminDashboard', component: AdminDashboard },
      { path: "tasks", name:'AdminTasks', component: AdminTasks },
      { path: "tasks/:task", name:'AdminTasksShow', component: AdminTasksShow },
      { path: "tasks/:task/edit", name:'AdminTasksEdit', component: AdminTasksEdit },
      // { path: "users", name:'AdminUsers', component: AdminUsers },
      // { path: "users/:user", name:'AdminUsersShow', component: AdminUsersShow },
      { path: "categories", name:'AdminCategories', component: AdminCategories },
    ],
    beforeEnter: (to, from, next) => {
      if(!store.getters['user/isAdmin']){
        return next("/login");
      }else{
        next();
      }
    },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.getters['user/isAdmin']){
        return next("/");
      } else {
        next();
      }
    },
  },

  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
