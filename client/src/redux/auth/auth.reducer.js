import actionTypes from "./auth.types";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN:
      return {
        ...state,
        loading: false,
        errors: action.error ? action.payload.errors : null
      };

    case "ASYNC_START":
      if (action.subtype === "LOGIN") {
        return { ...state, loading: true };
      }
      return state;
    default:
      return state;
  }
};
