import React from "react";
import { Link } from "react-router-dom";
import ArticleActions from "components/article-actions/article-actions.component";

const ArticleMeta = ({ article, canModify }) => (
  <div className="article-meta">
    <Link to={`@${article.author.username}`}>
      <img src={article.author.image} />
    </Link>

    <div className="info">
      <Link to={`@${article.author.username}`} className="author">
        {article.author.username}
      </Link>
      <span className="date">{new Date(article.createdAt).toDateString()}</span>

      <ArticleActions canModify={canModify} article={article} />
    </div>
  </div>
);

export default ArticleMeta;
