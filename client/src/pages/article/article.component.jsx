import React from "react";
import agent from "api/agent";
import { connect } from "react-redux";
import marked from "marked";
import { withRouter } from "react-router-dom";

import ArticleMeta from "components/article-meta/article-meta.component";
import CommentContainer from "components/comment-container/comment-container.component";

class ArticlePage extends React.Component {
  componentWillMount() {
    const {
      onLoad,
      match: { params }
    } = this.props;
    onLoad(
      Promise.all([
        agent.Articles.get(params.id),
        agent.Comments.forArticle(params.id)
      ])
    );
  }
  render() {
    const {
      article,
      match: { params },
      currentUser,
      comments,
      commentErrors
    } = this.props;
    if (!article) return null;

    const markup = { __html: marked(article.body) };
    const canModify =
      currentUser && currentUser.username === article.author.username;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container page">
            <h1>{article.title}</h1>
            <ArticleMeta article={article} canModify={canModify} />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup} />

              <ul className="tag-list">
                {article.tagList.map(tag => (
                  <li className="tag-defauly tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row">
          <CommentContainer
            comments={comments || []}
            errors={commentErrors}
            slug={params.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "ARTICLE_PAGE_LOADED", payload })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticlePage)
);
