import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return <div>{this.props.appName}</div>;
  }
}

function mapStateToProps(state) {
  return { appName: state.appName };
}

export default connect(mapStateToProps)(App);
