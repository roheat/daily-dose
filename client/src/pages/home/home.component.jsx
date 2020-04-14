import React from "react";
import { connect } from "react-redux";

import Banner from "components/banner/banner.component";
import MainView from "components/main-view/main-view.component";

class HomePage extends React.Component {
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

export default connect(mapStateToProps)(HomePage);
