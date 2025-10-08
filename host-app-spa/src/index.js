import "./index.css";

import * as ReactDOMClient from "react-dom/client"
import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store/index.js";
import { registerApplication, start, pathToActiveWhen  } from "single-spa";

import App from "./App.jsx";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// React Remote
registerApplication({
  name: "reactRemote",
  app: () => import("react_app/ReactIndex"), // Module Federation remote
  activeWhen: ["/storeA"],
});

// Vue Remote
registerApplication({
  name: "vueRemote",
  app: () => import("vue_app/App"), // Module Federation remote
  activeWhen: (location) => location.pathname.startsWith("/storeB"),
  customProps: { base: "/storeB" },
});

// Start Single-SPA
start();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Header /> },
      { path: "footer", element: <Footer /> },
      {
        path: "storeA/*",
        element: <div id="single-spa-application:reactRemote"></div>,
      },
      {
        path: "storeB/*",
        element: <div id="single-spa-application:vueRemote"></div>,
      },
    ],
  },
]);



const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);