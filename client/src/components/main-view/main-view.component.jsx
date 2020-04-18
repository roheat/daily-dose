import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import agent from "api/agent";
import ArticleList from "components/article-list/article-list.component";

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

const MainView = props => (
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
      </ul>
    </div>

    <ArticleList articles={props.articles} />
  </div>
);

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: "CHANGE_TAB", tab, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
