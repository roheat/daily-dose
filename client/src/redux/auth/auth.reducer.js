import AuthActionTypes from "./auth.types";
import CommonActionTypes from "../common/common.types";

export default (state = {}, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        loading: false,
        errors: action.error ? action.payload.errors : null
      };

    case CommonActionTypes.ASYNC_START:
      if (action.subtype === AuthActionTypes.LOGIN) {
        return { ...state, loading: true };
      }
      return state;
    default:
      return state;
  }
};
