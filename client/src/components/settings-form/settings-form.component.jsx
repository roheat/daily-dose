import React from "react";

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      const { image, username, bio, email } = this.props.currentUser;

      this.setState({ image, username, bio, email });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      const { image, username, bio, email } = nextProps.currentUser;

      this.setState(
        Object.assign({}, this.state, {
          image,
          username,
          bio,
          email
        })
      );
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const user = { ...this.state };

    if (!user.password) delete user.password;
    this.props.onSubmit(user);
  };

  render() {
    const { image, username, bio, email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="image"
            value={image}
            className="form-control form-control-lg"
            placeholder="Profile picture URL"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="username"
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="bio"
            className="form-control form-control-lg"
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="email"
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <input
            name="password"
            className="form-control form-control-lg"
            type="password"
            placeholder="Update Password"
            value={password}
            onChange={this.handleChange}
          />
        </div>

        <button className="btn btn-lg btn-primary pull-xs-right" type="submit">
          Update Settings
        </button>
      </form>
    );
  }
}

export default SettingsForm;
