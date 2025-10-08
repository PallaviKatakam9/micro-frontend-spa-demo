import { createRouter, createWebHistory } from "vue-router";

import Home from "./routes/Home.vue";
import Products from "./routes/Products.vue";

export function createVueRouter(base) {
  return createRouter({
    history: createWebHistory(base),
    routes: [
      { path: "/", component: Home },
      { path: "/products", component: Products },
    ],
  });
}