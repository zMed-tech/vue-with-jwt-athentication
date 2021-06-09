import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: {
      guest: true,
    },
  },

  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User.vue"),
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (localStorage.getItem("key")) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("key")) {
      next({
        name: "User",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
