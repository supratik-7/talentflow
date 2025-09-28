import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { makeServer } from "./mocks/server";


if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  makeServer({ environment: "development" });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
