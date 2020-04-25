import CommonActionTypes from "../common/common.types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommonActionTypes.HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case CommonActionTypes.HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
