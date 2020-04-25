import CommonActionTypes from "../common/common.types";
import EditorActionTypes from "./editor.types";

export default (state = {}, action) => {
  switch (action.type) {
    case EditorActionTypes.EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : "",
        title: action.payload ? action.payload.article.title : "",
        description: action.payload ? action.payload.article.description : "",
        body: action.payload ? action.payload.article.body : "",
        tagList: action.payload ? action.payload.article.tagList : [],
        tagInput: ""
      };

    case EditorActionTypes.UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };

    case EditorActionTypes.EDITOR_PAGE_UNLOADED:
      return {};

    case CommonActionTypes.ARTICLE_SUBMITTED:
      return {
        ...state,
        loading: false,
        errors: action.error ? action.payload.errors : null
      };

    case CommonActionTypes.ASYNC_START:
      if (action.subtype === CommonActionTypes.ARTICLE_SUBMITTED)
        return { ...state, loading: true };
      return state;

    case EditorActionTypes.ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ""
      };
    case EditorActionTypes.REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    default:
      return state;
  }
};
