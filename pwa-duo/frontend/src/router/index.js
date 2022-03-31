import { createRouter, createWebHistory } from "vue-router";
import TicketView from "../views/TicketView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: TicketView,
  },
  {
    path: "/login",
    name: "Sign In",
    component: SignInView,
  },
  {
    path: "/register",
    name: "Sign Up",
    component: SignUpView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
