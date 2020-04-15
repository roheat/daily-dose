import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Header from "components/header/header.component";
import HomePage from "pages/home/home.component";
import LoginPage from "pages/login/login.component";

class App extends React.Component {
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
  return { appName: state.appName };
}

export default connect(mapStateToProps)(App);
