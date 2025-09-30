const { INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const { getAuthToken } = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const CustomError = require("../../errorHandler/CustomError");
const Errors = require("../../errorHandler/domain/errors");

const DOWNSTREAM_CONFIG = {
  GET_PAYMENT_BY_ORDER_NUMBER: {
    downstream_system: "core-payment",
    source_system: "core-cart",
    domain: "cart",
    functionality: "get-payment-order-number"
  }
};

const handleError = ({ error, response }) => {
  if (!error) return { data: response.data };
  if (error && (!response || response?.status >= INTERNAL_SERVER_ERROR)) {
    return { mappedError: Errors.DownstreamServiceNetworkError(error) };
  }
  const mappedError = new CustomError({
    httpCode: response?.status,
    errors: response?.data?.errors
  });
  return { data: response.data, mappedError };
};

const getPaymentDetails = async ({ fastify, logTrace, data }) => {
  const { CORE_PAYMENT_SERVICE_URI } = fastify.config;

  const URL = `${CORE_PAYMENT_SERVICE_URI}/v1/payment-intent/order/${data.order_number}`;
  const AUTH_TOKEN = await getAuthToken("PLATFORM");

  const { response, error } = await fastify.request({
    url: URL,
    method: "GET",
    headers: {
      ...logTrace,
      Authorization: AUTH_TOKEN
    },
    path: URL,
    ...DOWNSTREAM_CONFIG.GET_PAYMENT_BY_ORDER_NUMBER
  });

  const { data: responseData, mappedError } = handleError({
    error,
    response,
    downstream_system: DOWNSTREAM_CONFIG.GET_PAYMENT_BY_ORDER_NUMBER.downstream_system
  });

  return {
    data: responseData,
    error: mappedError,
    attribute_key: "payment"
  };
};

module.exports = { getPaymentDetails };
