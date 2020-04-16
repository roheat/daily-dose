import { combineReducers } from "redux";

import homeReducer from "./home/home.reducer";
import authReducer from "./auth/auth.reducer";
import commonReducer from "./common/common.reducer";
import settingsReducer from "./settings/settings.reducer";
import articleReducer from "./article/article.reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  auth: authReducer,
  common: commonReducer,
  settings: settingsReducer,
  article: articleReducer
});

export default rootReducer;
