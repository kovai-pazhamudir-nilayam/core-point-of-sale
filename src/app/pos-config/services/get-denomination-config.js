const { mapDenominationConfig } = require("../mappers/pos-config");
const { DenominationConfigRepo } = require("../repository/denomination-config");

const getDenominationFilters = ({ query }) => {
  const filters = { where: {} };
  if (query?.is_active) {
    filters.where = { is_active: query.is_active === "true" };
  }
  return filters;
};

function getDenominationConfigService(fastify) {
  const { getDenominationConfig } = DenominationConfigRepo();

  return async ({ query }) => {
    const denominationFilters = getDenominationFilters({ query });
    const demonimationConfig = await getDenominationConfig.call(fastify.knex, {
      filters: denominationFilters
    });

    const mappedDenominationConfig = mapDenominationConfig({ input: demonimationConfig });

    return mappedDenominationConfig;
  };
}
module.exports = getDenominationConfigService;
