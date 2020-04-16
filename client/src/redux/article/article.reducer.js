import actionTypes from "./article.types";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };

    default:
      return state;
  }
};
