const fp = require("fastify-plugin");
const httpClient = require("./axios");
const Metrics = require("./metrics");
const { logger } = require("../../utils/logger");

const formatResponse = ({ response }) => {
  if (!response) return null;
  const { data, headers, status, statusText } = response;
  return { data, headers, status, statusText };
};

const httpClientWrapper =
  () =>
  // eslint-disable-next-line complexity
  async ({
    url,
    path,
    method,
    body,
    headers = {},
    timeout,
    downstream_system,
    source_system,
    domain,
    functionality
  }) => {
    const common = {
      request: {
        url,
        method,
        data: body,
        path,
        headers
      },
      downstream_system,
      source_system,
      domain,
      functionality
    };

    logger.debug({ ...common, message: `REST Request Context: ${url}` });

    const mInstance = Metrics.init({
      status_code: 200,
      method,
      route: path
    });

    try {
      const response = await httpClient({
        url,
        method,
        headers,
        body,
        timeout
      });
      mInstance.updateStatus(response.status).consume();
      logger.info({
        ...common,
        response: {
          data: response.data,
          response_time: mInstance.getResponseTime(),
          status_code: response.status
        },
        message: `REST Response Context: ${path}`
      });
      return { request: common, response: formatResponse({ response }) };
    } catch (error) {
      mInstance.updateStatus(error?.response?.status || 500).consume();
      logger.error({
        ...common,
        response: {
          code: error?.code,
          error: error?.response?.data,
          response_time: mInstance.getResponseTime(),
          status_code: error?.response?.status || error?.code || 500
        },
        message: `REST Response Context: ${path}`
      });
      return {
        request: common,
        response: formatResponse({ response: error.response }),
        error: true
      };
    }
  };

const httpClientPlugin = async fastify => {
  fastify.decorate("request", httpClientWrapper(fastify));
};
module.exports = fp(httpClientPlugin);
