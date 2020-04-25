import { applyMiddleware, createStore } from "redux";
import { promiseMiddleware, localStorageMiddleware } from "redux/middlewares";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [promiseMiddleware, localStorageMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
