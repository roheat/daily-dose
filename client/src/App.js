import React from "react";
import { connect } from "react-redux";

import Header from "components/header/header.component";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { appName: state.appName };
}

export default connect(mapStateToProps)(App);
