import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { App } from "vue";

const loadElementIcon = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};

export default loadElementIcon;
