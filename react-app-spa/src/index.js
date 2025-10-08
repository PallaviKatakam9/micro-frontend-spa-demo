import "./index.css";

import React from "react";
import * as ReactDOMClient from "react-dom/client"
import singleSpaReact from "single-spa-react";
import { Provider } from "react-redux";
import { useState, useEffect, Suspense } from "react";
import App from "./App.js";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.js";  
import Products from "./routes/Products.js";

// ----------------------
// App Wrapper Component
// ----------------------

function AppWrapper() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    import("host_app/reduxStore")
      .then((m) => setStore(m.store))
      .catch((err) => console.error("Failed to load host store", err));
  }, []);

  if (!store) return <div>Loading store...</div>;

  // 🧠 Detect current URL and strip /storeA prefix
  const currentPath = window.location.pathname.replace(/^\/storeA/, "") || "/";

  // Internal routing for the remote (MemoryRouter avoids conflict with host router)
  const router = createMemoryRouter(
    [
      {
        path: "/",   // This is relative to the remote mount
        element: <App />,
        children: [
          { path: "", element: <Home /> },
          { path: "products", element: <Products /> },
        ],
      },
    ],
    { initialEntries: [currentPath] } 
  );

  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <RouterProvider router={router} />
        </div>
      </Suspense>
    </Provider>
  );
}


// ----------------------
// Single-SPA Integration
// ----------------------
const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: AppWrapper,
  errorBoundary(err, info, props) {
    console.error("React Remote Error:", err);
    return <div>Error loading React Remote</div>;
  },
});

// Export lifecycles for Single-SPA
export const { bootstrap, mount, unmount } = lifecycles;