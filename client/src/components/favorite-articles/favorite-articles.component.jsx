import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import agent from "api/agent";
import { Profile, mapStateToProps } from "pages/profile/profile.component";

class FavoriteArticles extends Profile {
  componentDidMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.favoritedBy(this.props.match.params.username)
      ])
    );
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

        <li className="nav-item active">
          <Link to={`/@${profile.username}/favorites`} className="nav-link">
            Liked Articles
          </Link>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({ type: "FOLLOW_USER", payload: agent.Profile.follow(username) }),
  onUnfollow: username =>
    dispatch({
      type: "UNFOLLOW_USER",
      payload: agent.Profile.unfollow(username)
    }),
  onLoad: payload =>
    dispatch({ type: "PROFILE_FAVORITES_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "PROFILE_FAVORITES_PAGE_UNLOADED" })
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FavoriteArticles)
);
