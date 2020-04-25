import ArticleListActionTypes from "./article-list.types";
import CommonActionTypes from "../common/common.types";

export default (state = {}, action) => {
  switch (action.type) {
    case CommonActionTypes.HOME_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload && action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        tab: action.tab,
        currentPage: 0
      };

    case ArticleListActionTypes.APPLY_TAG_FILTER:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case CommonActionTypes.PROFILE_PAGE_LOADED:
    case CommonActionTypes.PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        articles: action.payload && action.payload[1].articles,
        articlesCount: action.payload && action.payload[1].articlesCount,
        currentPage: 0
      };

    case ArticleListActionTypes.SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };

    case CommonActionTypes.HOME_PAGE_UNLOADED:
    case CommonActionTypes.PROFILE_PAGE_UNLOADED:
    case CommonActionTypes.PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};

    case ArticleListActionTypes.CHANGE_TAB:
      return {
        ...state,
        tab: action.tab,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0
      };

    case ArticleListActionTypes.ARTICLE_FAVORITED:
    case ArticleListActionTypes.ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            };
          }
          return article;
        })
      };
    default:
      return state;
  }
};
