import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import  App  from "./App";
import { reducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import DashboardLoading from "./components/CoomingSoon/CoomingSoon";

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />

  </Provider>
  </BrowserRouter>
)

