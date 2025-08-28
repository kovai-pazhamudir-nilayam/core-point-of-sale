const { OutletConfigRepo, OUTLET_CONFIG } = require("../repository/outlet-config");
const downstreamCallsRepo = require("../repository/downstreamCalls");
const { mapOutletConfig } = require("../transformers/outlet-config");
const { DenominationConfigRepo } = require("../../pos-config/repository/denomination-config");
const {
  fetchRolloutFeatureConfig
} = require("../../rollout-feature-config/utils/rollout-feature-config");

function getOutletConfigService(fastify) {
  const { getOutletConfig } = OutletConfigRepo();
  const { getOutletById } = downstreamCallsRepo(fastify);
  const { getDenominationConfig } = DenominationConfigRepo();

  return async ({ query }) => {
    const { outlet_id: outletId, terminal_id } = query;

    const getOutletPromise = getOutletById({ outletId });

    const getOutletConfigPromise = getOutletConfig.call(fastify.knex, {
      filters: {
        where: { [OUTLET_CONFIG.COLUMNS.OUTLET_ID]: outletId }
      }
    });

    const getDenominationConfigPromise = getDenominationConfig.call(fastify.knex, {
      filters: { where: { is_active: true } }
    });

    const [{ data: outlet, error }, [outletConfig], denominationConfig] = await Promise.all([
      getOutletPromise,
      getOutletConfigPromise,
      getDenominationConfigPromise
    ]);
    if (error) throw error;

    const rolloutConfigs = await fetchRolloutFeatureConfig({
      fastify,
      outlet_id: outletId,
      terminal_id
    });

    const mappedOutletConfig = mapOutletConfig({
      outlet,
      outletConfig,
      denominationConfig,
      rolloutConfigs
    });

    return mappedOutletConfig;
  };
}
module.exports = getOutletConfigService;
