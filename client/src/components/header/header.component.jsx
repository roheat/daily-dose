import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-light">
        <div className="container">
          <a href="/" className="navbar-brand">
            {this.props.appName}
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
