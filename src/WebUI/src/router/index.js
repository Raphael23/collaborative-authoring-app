import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Authoring from "../views/Authoring.vue";
import firebase from "firebase";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },  
  {
    path: "/",
    name: "Authoring",
    component: Authoring,
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (home.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
];

const router = new VueRouter({
  node: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  firebase.auth().onAuthStateChanged(function(user) {
      if (requiresAuth && !user) {
          next("Login");
      } else {
          next();
      }
  });
});

export default router;