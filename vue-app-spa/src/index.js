import "./index.css";
import singleSpaVue from "single-spa-vue";
import { createApp, h } from "vue";
import {createVueRouter} from "./router.js";

import App from "./App.vue";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App)
  },
  handleInstance(app, props) {
    const base = props?.base || window.__MICRO_FRONTEND_BASE__ || "/storeB";
    const router = createVueRouter(base);
    app.use(router);
  },
});

// Export lifecycles for Single-SPA
export const { bootstrap, mount, unmount } = vueLifecycles;
