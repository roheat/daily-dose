import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import Header from "components/header/header.component";
import HomePage from "pages/home/home.component";
import LoginPage from "pages/login/login.component";
import RegisterPage from "pages/register/register.component";
import SettingsPage from "pages/settings/settings.component";
import ArticlePage from "pages/article/article.component";
import ProfilePage from "pages/profile/profile.component";
import ProfileFavoritesPage from "pages/profile-favorites/profile-favorites.component";
import EditorPage from "pages/editor/editor.component";

import actionTypes from "redux/common/common.types";
import agent from "api/agent";

class App extends React.Component {
  componentDidMount() {
    const token = window.localStorage.getItem("jwt");

    if (token) agent.setToken(token);

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  componentDidUpdate() {
    if (this.props.redirectTo) {
      this.props.history.push(this.props.redirectTo);
      this.props.onRedirect();
    }
  }

  render() {
    return (
      <div>
        {this.props.appLoaded ? (
          <React.Fragment>
            <Header
              appName={this.props.appName}
              currentUser={this.props.currentUser}
            />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/settings" component={SettingsPage} />
              <Route exact path="/article/:id" component={ArticlePage} />
              <Route exact path="/@:username" component={ProfilePage} />
              <Route
                exact
                path="/@:username/favorites"
                component={ProfileFavoritesPage}
              />
              <Route exact path="/editor" component={EditorPage} />
              <Route exact path="/editor/:slug" component={EditorPage} />
            </Switch>
          </React.Fragment>
        ) : (
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appName: state.common.appName,
    appLoaded: state.common.appLoaded,
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser
  };
}

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: actionTypes.REDIRECT }),
  onLoad: (payload, token) =>
    dispatch({ type: actionTypes.APP_LOAD, payload, token })
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
