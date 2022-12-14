import router from "../router";
import { userStore } from "./../store/useStore/index";
import App from '../App.vue'
import { createPinia } from "pinia";
import { createApp } from "vue";
import permissionToken from "./permissionToken";
export default () => {
  return new Promise((resolve) => {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    permissionToken();
    // 获取处理好的路由
    let routes = userStore().routers;
    routes.forEach((item) => router.addRoute("Layout", item));
    resolve("success");
  });
};
