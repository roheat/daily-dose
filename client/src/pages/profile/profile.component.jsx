import React from "react";
import { Link } from "react-router-dom";
import agent from "api/agent";
import { connect } from "react-redux";

import ArticleList from "components/article-list/article-list.component";
import EditProfileSettings from "components/edit-profile-settings/edit-profile-settings.component";
import FollowButton from "components/follow-button/follow-button.component";

class ProfilePage extends React.Component {
  componentDidMount() {
    this.props.onLoad(
      Promise.all([
        agent.Profile.get(this.props.match.params.username),
        agent.Articles.byAuthor(this.props.match.params.username)
      ])
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.following !== this.props.profile.following)
      nextProps.onLoad(
        Promise.all([
          agent.Profile.get(nextProps.match.params.username),
          agent.Articles.byAuthor(nextProps.match.params.username)
        ])
      );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`@${this.props.profile.username}`}
          >
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`@${this.props.profile.username}/favorites`}
          >
            Liked Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { profile, currentUser, articles } = this.props;
    if (!profile) return null;

    const isUserProfile =
      currentUser && profile.username === currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div style={{ minHeight: "11em" }}>
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image} className="user-img" alt="profile" />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUserProfile} />
              <div>
                <FollowButton
                  isUser={isUserProfile}
                  user={profile}
                  follow={this.props.onFollow}
                  unfollow={this.props.onUnfollow}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">{this.renderTabs()}</div>

              <ArticleList articles={articles} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username =>
    dispatch({ type: "FOLLOW_USER", payload: agent.Profile.follow(username) }),
  onUnfollow: username =>
    dispatch({
      type: "UNFOLLOW_USER",
      payload: agent.Profile.unfollow(username)
    }),
  onLoad: payload => dispatch({ type: "PROFILE_PAGE_LOADED", payload }),
  onUnload: () => dispatch({ type: "PROFILE_PAGE_UNLOADED" })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export { ProfilePage as Profile, mapStateToProps };
