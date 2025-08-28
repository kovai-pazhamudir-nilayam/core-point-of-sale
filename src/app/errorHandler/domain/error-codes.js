const HttpStatus = require("http-status-codes").StatusCodes;

module.exports = {
  TERMINAL_NOT_FOUND_ERROR: {
    name: "TERMINAL_NOT_FOUND_ERROR",
    message: "Terminal Doesn't Exists",
    explanation: "",
    httpStatusCode: HttpStatus.NOT_FOUND
  },
  TERMINAL_REGISTER_NOT_FOUND_ERROR: {
    name: "TERMINAL_REGISTER_NOT_FOUND_ERROR",
    message: "Terminal Open Register Doesn't Exists",
    explanation: "",
    httpStatusCode: HttpStatus.NOT_FOUND
  },
  ACTION_NOT_ALLOWED_ERROR: {
    name: "ACTION_NOT_ALLOWED_ERROR",
    message: "Action not allowed",
    explanation: "",
    httpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  },
  TERMINAL_REGISTER_OPEN_ERROR: {
    name: "TERMINAL_REGISTER_OPEN_ERROR",
    message: "Register is open, Please close and logout",
    explanation: "",
    httpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  },
  TERMINAL_SELECTION_ERROR: {
    name: "TERMINAL_SELECTION_ERROR",
    message: "This terminal is already getting used.",
    explanation: "",
    httpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  },
  REGISTER_ALREADY_OPEN_ERROR: {
    name: "REGISTER_ALREADY_OPEN_ERROR",
    message: "Register already open, please close",
    explanation: "",
    httpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  },
  DOWNSTREAM_ERROR: {
    name: "DOWNSTREAM_ERROR",
    message: "Downstream Service Error",
    explanation: "",
    httpStatusCode: HttpStatus.BAD_GATEWAY
  },
  ALREADY_LOGGED_IN_TERMINAL_ERROR: {
    name: "ALREADY_LOGGED_IN_TERMINAL_ERROR",
    message: "You are currently logged into the terminal - ",
    explanation: "",
    httpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
  },
  ROLLOUT_FEATURE_CONFIG_NOT_FOUND: {
    name: "ROLLOUT_FEATURE_CONFIG_NOT_FOUND",
    message: "rollout feature config not found for given id - ",
    explanation: "",
    httpStatusCode: HttpStatus.NOT_FOUND
  },
  DENOMINATION_MISMATCH_ERROR: {
    name: "DENOMINATION_MISMATCH_ERROR",
    message: "Mismatch in denomination declared",
    explanation: "",
    httpStatusCode: HttpStatus.BAD_REQUEST
  }
};
