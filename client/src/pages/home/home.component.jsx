import React from "react";
import { connect } from "react-redux";

import agent from "api/agent";
import Banner from "components/banner/banner.component";
import MainView from "components/main-view/main-view.component";
import TagsView from "components/tags-view/tags-view.component";
import ArticleListActionTypes from "redux/article-list/article-list.types";
import CommonActionTypes from "redux/common/common.types";

class HomePage extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? "feed" : "all";

    const articlesPromise = this.props.token
      ? agent.Articles.feed()
      : agent.Articles.all();

    this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
  }
  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <TagsView
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.common.appName,
  token: state.common.token,
  ...state.home
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) =>
    dispatch({ type: CommonActionTypes.HOME_PAGE_LOADED, tab, payload }),
  onClickTag: (tag, payload) =>
    dispatch({ type: ArticleListActionTypes.APPLY_TAG_FILTER, tag, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
