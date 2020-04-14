import React from "react";

import ArticlePreview from "components/article-preview/article-preview.component";

const ArticleList = ({ articles }) => {
  if (!articles) return <div className="article-preview">Loading...</div>;

  if (articles.length === 0)
    return <div className="article-preview">No articles here...yet!</div>;

  return (
    <div>
      {articles.map(article => (
        <ArticlePreview key={article.createdAt} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
