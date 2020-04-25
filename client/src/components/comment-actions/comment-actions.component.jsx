import React from "react";
import agent from "api/agent";
import { connect } from "react-redux";

import { deleteComment } from "redux/article/article.actions";

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
  onDelete: (payload, commentId) => dispatch(deleteComment(payload, commentId))
});

export default connect(null, mapDispatchToProps)(CommentActions);
