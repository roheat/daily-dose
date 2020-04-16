import React from "react";
import agent from "api/agent";
import { connect } from "react-redux";
import articleActionTypes from "redux/article/article.types";

const CommentActions = props => {
  const del = () => {
    props.onDelete(
      agent.Comments.delete(props.slug, props.commentId),
      props.commentId
    );
  };
  if (props.show)
    return (
      <span className="mod-options">
        <i className="ion-trash-a" onClick={del} />
      </span>
    );

  return null;
};

const mapDispatchToProps = dispatch => ({
  onDelete: (payload, commentId) =>
    dispatch({ type: articleActionTypes.DELETE_COMMENT, payload, commentId })
});

export default connect(null, mapDispatchToProps)(CommentActions);
