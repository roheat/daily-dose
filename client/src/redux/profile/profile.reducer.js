import CommonActionTypes from "../common/common.types";
import ProfileActionTypes from "./profile.types";

export default (state = {}, action) => {
  switch (action.type) {
    case CommonActionTypes.PROFILE_PAGE_LOADED:
    case CommonActionTypes.PROFILE_FAVORITES_PAGE_LOADED:
      return action.payload ? { ...action.payload[0].profile } : {};

    case CommonActionTypes.PROFILE_PAGE_UNLOADED:
    case CommonActionTypes.PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};

    case ProfileActionTypes.FOLLOW_USER:
    case ProfileActionTypes.UNFOLLOW_USER:
      return { ...action.payload.profile };

    default:
      return state;
  }
};
