import actionTypes from "./common.types";

const INITIAL_STATE = {
  appName: "DailyDose",
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case actionTypes.REDIRECT:
      return { ...state, redirectTo: null };

    case actionTypes.LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    default:
      return state;
  }
};
