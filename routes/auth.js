const jwt = require("express-jwt");
const secret = require("../config").secret;

function getTokenFromHeader(req) {
  // authorization: Token eygAewlj...
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Token"
  ) {
    return require.headers.authorization.split(" ")[1];
  }
  return null;
}

// 2 middlewares - required and optional
const auth = {
  required: jwt({
    secret,
    userProperty: "payload",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;
