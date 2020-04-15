import commonActionTypes from "./common.types";
import authActionTypes from "../auth/auth.types";
import settingsActionTypes from "../settings/settings.types";

const INITIAL_STATE = {
  appName: "DailyDose",
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case commonActionTypes.APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };

    case commonActionTypes.REDIRECT:
      return { ...state, redirectTo: null };

    case authActionTypes.LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case authActionTypes.LOGIN:
    case authActionTypes.REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };

    case settingsActionTypes.SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? null : action.payload.user
      };

    default:
      return state;
  }
};
