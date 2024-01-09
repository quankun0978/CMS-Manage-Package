import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store/store";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/icon/fontawesome-free-6.4.2-web/css/all.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
