import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/css/main.css";

setTimeout(() => {
  createApp(App).use(router).mount("#app");
}, 300);
