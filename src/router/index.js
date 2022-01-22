import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login.vue";
import dashboard from "../views/dashboard.vue";
import loading from "../views/loading.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/loading",
    name: "loading",
    component: loading,
  },
  {
    path: "*",
    redirect: "/",
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
