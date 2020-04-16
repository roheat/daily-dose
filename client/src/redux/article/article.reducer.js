import actionTypes from "./article.types";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ARTICLE_PAGE_LOADED:
      return {
        ...state,
        article: action.payload[0].article,
        comments: action.payload[1].comments
      };

    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        commentErrors: action.error ? action.payload.errors : null,
        comments: action.error
          ? null
          : (state.comments || []).concat([action.payload.comment])
      };
    default:
      return state;
  }
};
