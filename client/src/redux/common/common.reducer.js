import CommonActionTypes from "./common.types";
import AuthActionTypes from "../auth/auth.types";
import SettingsActionTypes from "../settings/settings.types";
import ArticleActionTypes from "../article/article.types";

const INITIAL_STATE = {
  appName: "DailyDose",
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommonActionTypes.APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };

    case CommonActionTypes.REDIRECT:
      return { ...state, redirectTo: null };

    case ArticleActionTypes.DELETE_ARTICLE:
      return {
        ...state,
        redirectTo: "/"
      };

    case AuthActionTypes.LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };

    case SettingsActionTypes.SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? null : action.payload.user
      };

    case CommonActionTypes.ARTICLE_SUBMITTED:
      const redirectTo = `/article/${action.payload.article.slug}`;
      return {
        ...state,
        redirectTo
      };

    default:
      return state;
  }
};
