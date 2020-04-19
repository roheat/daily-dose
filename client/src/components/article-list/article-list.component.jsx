import React from "react";

import ArticlePreview from "components/article-preview/article-preview.component";
import PaginationList from "components/pagination-list/pagination-list.component";

const ArticleList = props => {
  if (!props.articles) return <div className="article-preview">Loading...</div>;

  if (props.articles.length === 0)
    return <div className="article-preview">No articles here...yet!</div>;

  return (
    <div>
      {props.articles.map(article => (
        <ArticlePreview key={article.createdAt} article={article} />
      ))}

      <PaginationList
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={props.onSetPage}
      />
    </div>
  );
};

export default ArticleList;
