export const mfConfig = {
  name: "vue_app",
  fileName : "remoteEntry.js",
  exposes: {
    "./App": "./src/index.js",
    "./Home": "./src/routes/Home.vue",
    "./Products": "./src/routes/Products.vue",
  },
  remotes: {
    host_app: "host_app@http://localhost:3000/remoteEntry.js",
  },
  shared: {
    vue: { singleton: true, eager: true, requiredVersion: "^3.2.0" },
    "@reduxjs/toolkit": { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true },
  },
};
