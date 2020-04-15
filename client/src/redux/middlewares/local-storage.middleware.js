import authActionTypes from "redux/auth/auth.types";
import agent from "api/agent";

const localStorageMiddleware = store => next => action => {
  if (action.type === authActionTypes.LOGIN) {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      agent.setToken(action.payload.user.token);
    }
  }

  next(action);
};

export default localStorageMiddleware;
