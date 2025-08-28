const ErrorCodes = require("./error-codes");
const CustomError = require("../CustomError");

module.exports = {
  DownstreamServiceNetworkError: error =>
    CustomError.create({
      httpCode: ErrorCodes.DOWNSTREAM_ERROR.httpStatusCode,
      message: ErrorCodes.DOWNSTREAM_ERROR.message,
      code: ErrorCodes.DOWNSTREAM_ERROR.name,
      error
    }),

  TerminalNotFoundError: error =>
    CustomError.create({
      httpCode: ErrorCodes.TERMINAL_NOT_FOUND_ERROR.httpStatusCode,
      message: ErrorCodes.TERMINAL_NOT_FOUND_ERROR.message,
      code: ErrorCodes.TERMINAL_NOT_FOUND_ERROR.name,
      error
    }),

  TerminalRegisterNotFoundError: () =>
    CustomError.create({
      httpCode: ErrorCodes.TERMINAL_REGISTER_NOT_FOUND_ERROR.httpStatusCode,
      message: ErrorCodes.TERMINAL_REGISTER_NOT_FOUND_ERROR.message,
      code: ErrorCodes.TERMINAL_REGISTER_NOT_FOUND_ERROR.name
    }),

  ActionNotAllowedError: () =>
    CustomError.create({
      httpCode: ErrorCodes.ACTION_NOT_ALLOWED_ERROR.httpStatusCode,
      message: ErrorCodes.ACTION_NOT_ALLOWED_ERROR.message,
      code: ErrorCodes.ACTION_NOT_ALLOWED_ERROR.name
    }),

  TerminalRegisterOpenError: () =>
    CustomError.create({
      httpCode: ErrorCodes.TERMINAL_REGISTER_OPEN_ERROR.httpStatusCode,
      message: ErrorCodes.TERMINAL_REGISTER_OPEN_ERROR.message,
      code: ErrorCodes.TERMINAL_REGISTER_OPEN_ERROR.name
    }),

  TerminalSelectionError: () =>
    CustomError.create({
      httpCode: ErrorCodes.TERMINAL_SELECTION_ERROR.httpStatusCode,
      message: ErrorCodes.TERMINAL_SELECTION_ERROR.message,
      code: ErrorCodes.TERMINAL_SELECTION_ERROR.name
    }),

  RegisterAlreadyOpenError: () =>
    CustomError.create({
      httpCode: ErrorCodes.REGISTER_ALREADY_OPEN_ERROR.httpStatusCode,
      message: ErrorCodes.REGISTER_ALREADY_OPEN_ERROR.message,
      code: ErrorCodes.REGISTER_ALREADY_OPEN_ERROR.name
    }),
  AlreadyLoggedInTerminalError: ({ terminal_id }) =>
    CustomError.create({
      httpCode: ErrorCodes.ALREADY_LOGGED_IN_TERMINAL_ERROR.httpStatusCode,
      message: `${ErrorCodes.ALREADY_LOGGED_IN_TERMINAL_ERROR.message} ${terminal_id}`,
      code: ErrorCodes.ALREADY_LOGGED_IN_TERMINAL_ERROR.name
    }),
  RolloutFeatureConfigNotFoundError: ({ rollout_feature_config_id }) =>
    CustomError.create({
      httpCode: ErrorCodes.ROLLOUT_FEATURE_CONFIG_NOT_FOUND.httpStatusCode,
      message: `${ErrorCodes.ROLLOUT_FEATURE_CONFIG_NOT_FOUND.message} ${rollout_feature_config_id}`,
      code: ErrorCodes.ROLLOUT_FEATURE_CONFIG_NOT_FOUND.name
    }),
  DenominationMismatchError: () =>
    CustomError.create({
      httpCode: ErrorCodes.DENOMINATION_MISMATCH_ERROR.httpStatusCode,
      message: ErrorCodes.DENOMINATION_MISMATCH_ERROR.message,
      code: ErrorCodes.DENOMINATION_MISMATCH_ERROR.name
    })
};
