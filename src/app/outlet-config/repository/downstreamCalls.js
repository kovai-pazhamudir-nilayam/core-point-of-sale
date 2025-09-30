const { INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;
const { getAuthToken } = require("@kovai-pazhamudir-nilayam/kpn-platform-token");
const CustomError = require("../../errorHandler/CustomError");
const Errors = require("../../errorHandler/domain/errors");

const DOWNSTREAM_CONFIG = {
  GET_OUTLET: {
    path: "/core-network/v1/outlets/:outlet_id",
    downstream_system: "core-network-service",
    source_system: "core-point-of-sale",
    domain: "core-point-of-sale",
    functionality: `Get Outlet by Id`
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

function downstreamCallsRepo(fastify) {
  async function getOutletById({ outletId }) {
    const AUTH_TOKEN = await getAuthToken("PLATFORM");
    const URL = `${fastify.config.CORE_NETWORK_SERVICE_URI}/v1/outlets/${outletId}`;

    const { response, error } = await fastify.request({
      url: URL,
      method: "GET",
      headers: { Authorization: AUTH_TOKEN, "x-channel-id": "WEB" },
      ...DOWNSTREAM_CONFIG.GET_OUTLET
    });

    const { data: responseData, mappedError } = handleError({
      error,
      response,
      downstream_system: DOWNSTREAM_CONFIG.GET_OUTLET.downstream_system
    });

    return { data: responseData, error: mappedError };
  }

  return { getOutletById };
}

module.exports = downstreamCallsRepo;
