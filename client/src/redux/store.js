import { applyMiddleware, createStore } from "redux";
import { promiseMiddleware } from "redux/middleware";

import rootReducer from "./root-reducer";

const middlewares = [promiseMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
