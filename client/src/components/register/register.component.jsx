import React from "react";
import ListErrors from "components/list-errors/list-errors.component";
import { Link } from "react-router-dom";
import agent from "api/agent";
import { connect } from "react-redux";
import actionTypes from "redux/auth/auth.types";

class Register extends React.Component {
  constructor() {
    super();
    this.state = { username: "", email: "", password: "" };
  }

  handleSumbit = event => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props.onSubmit(username, email, password);
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    const { username, email, password } = this.state;
    const { errors, loading } = this.props;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Already have an account? Log in.</Link>
              </p>
              <ListErrors errors={errors} />
              <form onSubmit={this.handleSumbit}>
                <div className="form-group">
                  <input
                    type="username"
                    name="username"
                    value={username}
                    className="form-control form-control-lg"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                </div>
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
                  Sign up
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
  onSubmit: (username, email, password) =>
    dispatch({
      type: actionTypes.REGISTER,
      payload: agent.Auth.register(username, email, password)
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
