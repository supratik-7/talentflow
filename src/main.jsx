import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { makeServer } from "./mocks/server";


if (typeof window !== "undefined") {
  makeServer({ environment: "development" });
  console.log("✅ MirageJS started in browser");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
