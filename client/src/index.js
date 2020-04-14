import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";

import App from "App";
import { promiseMiddleware } from "redux/middleware";
const middlewares = [promiseMiddleware];

const INITIAL_STATE = {
  appName: "DailyDose",
  articles: null
};

const reducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return { ...state, articles: action.payload.articles };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
