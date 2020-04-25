import SettingsActionTypes from "./settings.types";
import CommonActionTypes from "../common/common.types";

export default (state = {}, action) => {
  switch (action.type) {
    case SettingsActionTypes.SETTINGS_SAVED:
      return {
        ...state,
        loading: false,
        errors: action.error ? action.payload.errors : null
      };

    case CommonActionTypes.ASYNC_START:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
