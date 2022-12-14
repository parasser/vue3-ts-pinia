import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { ElMessage } from "element-plus";
import refreshRoute from "./utils/refreshRoute";
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from "./router";
import loadElementIcon from "./plugins/loadElementIcon";
import { createPinia } from 'pinia'
import { registerStore } from '../src/store'
const app = createApp(App)
refreshRoute().then(() => {
  const pinia = createPinia();
  app.use(router);
  app.use(pinia);
  pinia.use(piniaPluginPersistedstate);
  loadElementIcon(app);
  app.use(ElementPlus)
  registerStore();
  app.config.globalProperties.$message = ElMessage;
  app.mount("#app");
});
