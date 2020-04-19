export default (state = {}, action) => {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return {
        ...state,
        articles: action.payload && action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        tab: action.tab,
        currentPage: 0
      };

    case "APPLY_TAG_FILTER":
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case "PROFILE_PAGE_LOADED":
    case "PROFILE_FAVORITES_PAGE_LOADED":
      return {
        ...state,
        articles: action.payload && action.payload[1].articles,
        articlesCount: action.payload && action.payload[1].articlesCount,
        currentPage: 0
      };

    case "SET_PAGE":
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };

    case "HOME_PAGE_UNLOADED":
    case "PROFILE_PAGE_UNLOADED":
    case "PROFILE_FAVORITES_PAGE_UNLOADED":
      return {};

    case "CHANGE_TAB":
      return {
        ...state,
        tab: action.tab,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0
      };
    default:
      return state;
  }
};
