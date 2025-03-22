import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Tailwind CSS file
import Navbar from "./components/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  
    <App />
  </BrowserRouter>
);
