import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import  App  from "./App";
import { rootReducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    

  </Provider>
  </BrowserRouter>
)

