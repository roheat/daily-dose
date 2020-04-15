import { applyMiddleware, createStore } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "redux/middlewares";

import rootReducer from "./root-reducer";

const middlewares = [promiseMiddleware, localStorageMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
