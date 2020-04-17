export default (state = {}, action) => {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        articles: action.payload && action.payload.articles
      };

    case "PROFILE_PAGE_LOADED":
    case "PROFILE_FAVORITES_PAGE_LOADED":
      return {
        ...state,
        articles: action.payload && action.payload[1].articles,
        articlesCount: action.payload && action.payload[1].articlesCount
      };

    case "HOME_PAGE_UNLOADED":
    case "PROFILE_PAGE_UNLOADED":
    case "PROFILE_FAVORITES_PAGE_UNLOADED":
      return {};
    default:
      return state;
  }
};
