import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import axios from "axios";
import { Provider } from "react-redux";

import { store } from "./redux/store";

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URI;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
