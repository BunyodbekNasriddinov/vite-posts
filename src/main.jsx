import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { TokenProvider } from "./context/TokenContext.jsx";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TokenProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </TokenProvider>
  </BrowserRouter>
);
