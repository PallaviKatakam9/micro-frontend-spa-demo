import { Outlet } from "react-router-dom";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";


const App = () => (

  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <Header />
    <h1>Host App</h1>
    <Outlet />
    <main style={{ padding: "1rem" }}>
      <div id="single-spa-application:reactRemote"></div>
      {/* <div id="single-spa-application:vueRemote"></div> */}
    </main>
    <Footer />
  </div>
);

export default App;