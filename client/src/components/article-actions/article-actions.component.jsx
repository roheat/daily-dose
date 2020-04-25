import React from "react";
import { Link } from "react-router-dom";
import agent from "api/agent";
import { connect } from "react-redux";

import { deleteArticle } from "redux/article/article.actions";

const ArticleActions = props => {
  const { article, canModify, onDelete } = props;
  const del = () => onDelete(agent.Articles.del(article.slug));

  if (canModify)
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Article
        </Link>{" "}
        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Article
        </button>
      </span>
    );
  return <span />;
};

const mapDispatchToProps = dispatch => ({
  onDelete: payload => dispatch(deleteArticle(payload))
});

export default connect(null, mapDispatchToProps)(ArticleActions);
