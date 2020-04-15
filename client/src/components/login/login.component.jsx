import React from "react";
import { connect } from "react-redux";
import agent from "api/agent";
import ListErrors from "components/list-errors/list-errors.component";

import actionTypes from "redux/auth/auth.types";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  handleSumbit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit(email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { loading, errors, email, password } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a href="/">Need an account? Sign up here.</a>
              </p>
              <ListErrors errors={errors} />
              <form onSubmit={this.handleSumbit}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    className="form-control form-control-lg"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={loading}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({
      type: actionTypes.AUTH_LOGIN,
      payload: agent.Auth.login(email, password)
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
