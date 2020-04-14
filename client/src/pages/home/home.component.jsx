import React from "react";
import { connect } from "react-redux";

import Banner from "components/banner/banner.component";
import MainView from "components/main-view/main-view.component";
import agent from "api/agent";

class HomePage extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Articles.all());
  }
  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appName: state.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: "HOME_PAGE_LOADED", payload })
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
