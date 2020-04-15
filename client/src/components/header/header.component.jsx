import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div className="navbar navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appName}
          </Link>

          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
