import authActionTypes from "redux/auth/auth.types";
import agent from "api/agent";

const localStorageMiddleware = store => next => action => {
  if (
    action.type === authActionTypes.LOGIN ||
    action.type === authActionTypes.REGISTER
  ) {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  } else if (action.type === authActionTypes.LOGOUT) {
    window.localStorage.setItem("jwt", "");
    agent.setToken(null);
  }

  next(action);
};

export default localStorageMiddleware;
