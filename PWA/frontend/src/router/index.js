import { createRouter, createWebHistory } from "vue-router";
import TicketView from "../views/TicketView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";
import DashboardView from "../views/DashboardView.vue";
import DashboardEventsView from "../views/DashboardEventsView.vue";
import DashboardEventCreateView from "../views/DashboardEventCreateView.vue";
import ScanTicketView from "../views/ScanTicketView.vue";
import EventShopView from "../views/EventShopView.vue";
import EventBuyView from "../views/EventBuyView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: TicketView,
    meta: { requiresAuth: true },
  },
  {
    path: "/event-shop",
    name: "Event Shop",
    component: EventShopView,
    meta: { requiresAuth: true },
  },
  {
    path: "/event-buy",
    name: "Event Buy",
    component: EventBuyView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Sign In",
    component: SignInView,
    meta: { disableOnAuth: true },
  },
  {
    path: "/register",
    name: "Sign Up",
    component: SignUpView,
    meta: { disableOnAuth: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true, role: "PARTNER" },
  },
  {
    path: "/scan-ticket",
    name: "Scan Ticket",
    component: ScanTicketView,
    meta: { requiresAuth: true, role: "CHECKUP" },
  },
  {
    path: "/dashboard/events",
    name: "Dashboard Events",
    component: DashboardEventsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/eventCreate",
    name: "Dashboard Create Events",
    component: DashboardEventCreateView,
    meta: { requiresAuth: true },
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

const axios = require("axios");
let status;
function isLoggedIn() {
  axios
    .get("http://192.168.31.173:5000/api/auth/status", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(() => {
      //Perform Success Action
      // console.log(res.data.data.accessToken);
      status = true;
      return status;
    })
    .catch(() => {
      // error.response.status Check status code
      status = false;
      return status;
    });
}
isLoggedIn();

let role;
function getRole() {
  axios
    .get("http://192.168.31.173:5000/api/auth/role", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      //Perform Success Action
      // console.log(res.data.data.accessToken);
      role = res.data.data.role;
      return role;
    });
}

getRole();

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !status) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
  if (to.meta.disableOnAuth && status) {
    return {
      path: "/",
    };
  }
  if (to.meta.role !== undefined) {
    if (to.meta.role !== role) {
      return {
        path: "/",
      };
    }
  }
});
export default router;
