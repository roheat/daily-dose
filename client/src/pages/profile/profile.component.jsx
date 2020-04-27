import React from "react";
import { Link } from "react-router-dom";
import agent from "api/agent";
import { connect } from "react-redux";

import ArticleList from "components/article-list/article-list.component";
import EditProfileSettings from "components/edit-profile-settings/edit-profile-settings.component";
import FollowButton from "components/follow-button/follow-button.component";

import ArticleListActionTypes from "redux/article-list/article-list.types";
import CommonActionTypes from "redux/common/common.types";
import ProfileActionTypes from "redux/profile/profile.types";

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

  onSetPage(page) {
    const promise = agent.Articles.byAuthor(this.props.profile.username, page);
    this.props.onSetPage(page, promise);
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
    const {
      profile,
      currentUser,
      articles,
      articlesCount,
      currentPage
    } = this.props;
    if (!profile) return null;

    const isUserProfile =
      currentUser && profile.username === currentUser.username;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div style={{ minHeight: "13em" }}>
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

              <ArticleList
                articles={articles}
                articlesCount={articlesCount}
                currentPage={currentPage}
                onSetPage={this.onSetPage}
              />
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
    dispatch({ type: CommonActionTypes.PROFILE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: CommonActionTypes.PROFILE_PAGE_UNLOADED }),
  onSetPage: (page, payload) =>
    dispatch({ type: ArticleListActionTypes.SET_PAGE, page, payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export { ProfilePage as Profile, mapStateToProps };
