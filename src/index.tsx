import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import  App  from "./App";
import { reducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import DashboardLoading from "./components/CoomingSoon/CoomingSoon";

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
  <Provider store={store}>
    <App />

  </Provider>,
  document.querySelector("#root")
);
