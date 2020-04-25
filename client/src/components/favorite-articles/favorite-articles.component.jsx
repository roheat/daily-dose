import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import agent from "api/agent";
import { Profile, mapStateToProps } from "pages/profile/profile.component";
import ArticleListActionTypes from "redux/article-list/article-list.types";
import ProfileActionTypes from "redux/profile/profile.types";
import CommonActionTypes from "redux/common/common.types";

class FavoriteArticles extends Profile {
  componentDidMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.favoritedBy(this.props.match.params.username)
      ])
    );
  }

  onSetPage(page) {
    const promise = agent.Articles.favoritedBy(
      this.props.profile.username,
      page
    );
    this.props.onSetPage(page, promise);
  }

  renderTabs() {
    const { profile } = this.props;
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link to={`/@${profile.username}`} className="nav-link">
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${profile.username}/favorites`}
            className="nav-link active"
          >
            Liked Articles
          </Link>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({
      type: ProfileActionTypes.FOLLOW_USER,
      payload: agent.Profile.follow(username)
    }),
  onUnfollow: username =>
    dispatch({
      type: ProfileActionTypes.UNFOLLOW_USER,
      payload: agent.Profile.unfollow(username)
    }),
  onLoad: payload =>
    dispatch({
      type: CommonActionTypes.PROFILE_FAVORITES_PAGE_LOADED,
      payload
    }),
  onUnload: () =>
    dispatch({ type: CommonActionTypes.PROFILE_FAVORITES_PAGE_UNLOADED }),
  onSetPage: (page, payload) =>
    dispatch({ type: ArticleListActionTypes.SET_PAGE, page, payload })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoriteArticles)
);
