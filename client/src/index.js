import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./App";

const INITIAL_STATE = {
  appName: "DailyDose",
  articles: null
};

const reducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
};

// 3 functions in store: subscribe, dispatch, getState
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
