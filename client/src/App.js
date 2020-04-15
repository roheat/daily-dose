import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import Header from "components/header/header.component";
import HomePage from "pages/home/home.component";
import LoginPage from "pages/login/login.component";
import actionTypes from "redux/common/common.types";
import agent from "api/agent";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

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
        <Header appName={this.props.appName} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { appName: state.common.appName, redirectTo: state.common.redirectTo };
}

const mapDispatchToProps = dispatch => ({
  onRedirect: () => dispatch({ type: actionTypes.REDIRECT }),
  onLoad: (payload, token) =>
    dispatch({ type: actionTypes.APP_LOAD, payload, token })
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
