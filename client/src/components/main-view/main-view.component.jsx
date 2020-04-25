import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import agent from "api/agent";
import ArticleList from "components/article-list/article-list.component";
import ArticleListActionTypes from "redux/article-list/article-list.types";

const YourFeedTab = props => {
  const handleClick = event => {
    event.preventDefault();

    props.onTabClick("feed", agent.Articles.feed());
  };
  if (props.token) {
    return (
      <li className="nav-item">
        <Link
          to=""
          className={props.tab === "feed" ? "nav-link active" : "nav-link"}
          onClick={handleClick}
        >
          Your Feed
        </Link>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const handleClick = event => {
    event.preventDefault();
    props.onTabClick("all", agent.Articles.all());
  };
  if (props.token) {
    return (
      <li className="nav-item">
        <Link
          to=""
          className={props.tab === "all" ? "nav-link active" : "nav-link"}
          onClick={handleClick}
        >
          Global Feed
        </Link>
      </li>
    );
  }
  return null;
};

const TagFilterTab = props => {
  if (!props.tag) return null;
  return (
    <li className="nav-item">
      <Link to="" className="nav-link active">
        <i className="ion-pound" /> {props.tag}
      </Link>
    </li>
  );
};

const MainView = props => {
  const onSetPage = page => props.onSetPage(props.tab, page);
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick}
          />
          {!(props.tab === "all" || props.tab === "feed") && (
            <TagFilterTab tag={props.tag} />
          )}
        </ul>
      </div>

      <ArticleList
        articles={props.articles}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        onSetPage={onSetPage}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) =>
    dispatch({ type: ArticleListActionTypes.CHANGE_TAB, tab, payload }),
  onSetPage: (tab, page) =>
    dispatch({
      type: ArticleListActionTypes.SET_PAGE,
      page,
      payload:
        tab === "feed" ? agent.Articles.feed(page) : agent.Articles.all(page)
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
