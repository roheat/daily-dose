import actionTypes from "./settings.types";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SETTINGS_SAVED:
      return {
        ...state,
        loading: false,
        errors: action.error ? action.payload.errors : null
      };

    case "ASYNC_START":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
