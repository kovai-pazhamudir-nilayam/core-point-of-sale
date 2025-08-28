const { logQuery } = require("../../commons/helpers");

const ROLLOUT_FEATURE_CONFIG = {
  NAME: "rollout_feature_config",
  COLUMNS: {
    ROLLOUT_FEATURE_CONFIG_ID: "rollout_feature_config_id",
    FEATURE_NAME: "feature_name",
    OUTLET_ID: "outlet_id",
    IS_ACTIVE: "is_active"
  }
};

function RolloutFeatureConfigRepo() {
  async function getRolloutFeatureConfig({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(ROLLOUT_FEATURE_CONFIG.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Get Rollout Feature Config" });

    const [response] = await query;

    return response;
  }

  async function getRolloutFeatureConfigs({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(ROLLOUT_FEATURE_CONFIG.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Get Rollout Feature Configs" });

    const response = await query;

    return response;
  }

  async function createRolloutFeatureConfig({ input }) {
    const knex = this;
    const { rolloutFeatureConfigPayload, modifiedAudit, createdAudit } = input;

    const query = knex(ROLLOUT_FEATURE_CONFIG.NAME)
      .returning("*")
      .insert({ ...rolloutFeatureConfigPayload, ...createdAudit })
      .onConflict([
        ROLLOUT_FEATURE_CONFIG.COLUMNS.OUTLET_ID,
        ROLLOUT_FEATURE_CONFIG.COLUMNS.FEATURE_NAME
      ])
      .merge({ ...rolloutFeatureConfigPayload, ...modifiedAudit });
    logQuery({ query, context: "Create Rollout Feature Config" });
    return query;
  }

  async function updateRolloutFeatureConfig({ input }) {
    const knex = this;
    const { filters, rolloutFeatureConfig } = input;
    const { where: whereClause } = filters;
    const query = knex(ROLLOUT_FEATURE_CONFIG.NAME).returning("*").update(rolloutFeatureConfig);
    if (whereClause) {
      query.where(whereClause);
    }
    logQuery({ query, context: "Update Rollout Feature Config" });
    const [updatedRolloutFeatureConfig] = await query;
    return updatedRolloutFeatureConfig;
  }

  async function deleteRolloutFeatureConfig({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(ROLLOUT_FEATURE_CONFIG.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Rollout Feature Config" });

    const deletedRolloutFeatureConfig = await query;

    return deletedRolloutFeatureConfig;
  }

  return {
    getRolloutFeatureConfig,
    getRolloutFeatureConfigs,
    createRolloutFeatureConfig,
    updateRolloutFeatureConfig,
    deleteRolloutFeatureConfig
  };
}

module.exports = { RolloutFeatureConfigRepo, ROLLOUT_FEATURE_CONFIG };
