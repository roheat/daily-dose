const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "HOME_PAGE_UNLOADED":
      return {};
    default:
      return state;
  }
};
