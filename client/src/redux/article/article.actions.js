import ArticleActionTypes from "./article.types";

export const loadArticle = payload => ({
  type: ArticleActionTypes.ARTICLE_PAGE_LOADED,
  payload
});

export const deleteArticle = payload => ({
  type: ArticleActionTypes.DELETE_ARTICLE,
  payload
});

export const addComment = payload => ({
  type: ArticleActionTypes.ADD_COMMENT,
  payload
});

export const deleteComment = (payload, commentId) => ({
  type: ArticleActionTypes.DELETE_COMMENT,
  payload,
  commentId
});
