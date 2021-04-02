import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Layout from "./components/Layout/Layout";
import "./global.css";

ReactDOM.render(
  <Layout>
    <App />
  </Layout>,
  document.getElementById("root")
);
