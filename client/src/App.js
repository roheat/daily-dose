import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Header from "components/header/header.component";
import HomePage from "pages/home/home.component";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { appName: state.appName };
}

export default connect(mapStateToProps)(App);
