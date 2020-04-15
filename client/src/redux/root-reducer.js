import { combineReducers } from "redux";

import homeReducer from "./home/home.reducer";
import authReducer from "./auth/auth.reducer";
import commonReducer from "./common/common.reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  common: commonReducer
});

export default rootReducer;
