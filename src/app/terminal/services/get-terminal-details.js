const _ = require("lodash");
const Errors = require("../../errorHandler/domain/errors");
const { TerminalRepo, TERMINAL } = require("../repository/terminal");
const { OutletMacVersionRepo } = require("../../outlet-deployment/repository/outlet_mac-version");

const getTerminalFilters = ({ input }) => {
  const { mac_address } = input;
  const filters = {
    [TERMINAL.COLUMNS.MAC_ADDRESS]: mac_address.toLowerCase()
  };
  return filters;
};

const buildResponse = (reposponse, deploymentType, enviromnent) => {
  const { created_at, created_by, last_modified_at, last_modified_by, ...rest } = reposponse;
  return {
    ...rest,
    deployment_type: deploymentType,
    environment: enviromnent,
    audit: { created_at, created_by, last_modified_at, last_modified_by }
  };
};

function getTerminalDetailsService(fastify) {
  const environment = fastify.config.ENVIRONMENT;
  const { getTerminal } = TerminalRepo();
  const { getOutletMacVersion } = OutletMacVersionRepo();

  return async ({ params }) => {
    const terminalFilters = getTerminalFilters({ input: params });

    const [terminalResponse] = await getTerminal.call(fastify.knex, {
      filters: { where: terminalFilters }
    });

    const [outletMacVersionResponse] = await getOutletMacVersion.call(fastify.knex, {
      filters: { where: terminalFilters }
    });

    if (_.isEmpty(outletMacVersionResponse)) {
      throw Errors.TerminalNotFoundError();
    }

    const { type } = outletMacVersionResponse;

    if (_.isEmpty(terminalResponse)) {
      return buildResponse(outletMacVersionResponse, type, environment);
    }

    return buildResponse(terminalResponse, type, environment);
  };
}
module.exports = getTerminalDetailsService;
