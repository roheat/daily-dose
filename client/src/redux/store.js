import { applyMiddleware, createStore } from "redux";
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

export default store;
