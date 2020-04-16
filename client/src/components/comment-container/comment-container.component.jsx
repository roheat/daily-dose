import React from "react";
import { Link } from "react-router-dom";

import ListErrors from "components/list-errors/list-errors.component";
import CommentInput from "components/comment-input/comment-input.component";

const CommentContainer = props => {
  if (props.currentUser)
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={props.errors} />
          <CommentInput slug={props.slug} currentUser={props.currentUser} />
        </div>

        {/* <CommentList
          comments={props.comments}
          slug={props.slug}
          currentUser={props.currentUser}
        /> */}
      </div>
    );

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link>
        {` or `}
        <Link to="/register">Sign up</Link>
        {` to add comments on this article.`}
      </p>
      {/* 
      <CommentList
        comments={props.comments}
        slug={props.slug}
        currentUser={props.currentUser}
      /> */}
    </div>
  );
};

export default CommentContainer;
