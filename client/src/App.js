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
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appName: state.common.appName,
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
