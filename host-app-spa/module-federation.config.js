export const mfConfig = {
  name: "host_app",
  filename: "remoteEntry.js",
  exposes: {
    "./reduxStore": "./src/store/index.js",
    "./store/apis": "./src/store/apis.js",
  },
  remotes : {
    react_app: "react_app@http://localhost:3001/react_app.js",
    vue_app: "vue_app@http://localhost:3002/vue_app.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "react-dom": { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "react-dom/client": { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "@reduxjs/toolkit": { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true },
    vue: { singleton: true, eager: true, requiredVersion: "^3.2.0" },
  },
};
