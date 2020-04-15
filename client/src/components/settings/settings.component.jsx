import React from "react";
import ListErrors from "components/list-errors/list-errors.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import agent from "api/agent";

import authActionTypes from "redux/auth/auth.types";
import settingsActionTypes from "redux/settings/settings.types";
import SettingsForm from "components/settings-form/settings-form.component";

class Settings extends React.Component {
  render() {
    const { loading, errors, currentUser, onSubmit, logout } = this.props;
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>

              <ListErrors errors={errors} />
              <SettingsForm
                currentUser={currentUser}
                onSubmit={onSubmit}
                loading={loading}
              />

              <hr />
              <button className="btn btn-outline-danger" onClick={logout}>
                Click here to logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: authActionTypes.LOGOUT }),
  onSubmit: user =>
    dispatch({
      type: settingsActionTypes.SETTINGS_SAVED,
      payload: agent.Auth.save(user)
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
