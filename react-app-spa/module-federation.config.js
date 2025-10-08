export const mfConfig = {
  name: "react_app",
  fileName : "remoteEntry.js",
  exposes: {
    "./ReactIndex": "./src/index.js",
  },
  remotes: {
    host_app: "host_app@http://localhost:3000/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "react-dom": { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "react-dom/client": { singleton: true, eager: true, requiredVersion: "^19.2.0" },
    "@reduxjs/toolkit": { singleton: true, eager: true },
    "react-redux": { singleton: true, eager: true },
  },
};
