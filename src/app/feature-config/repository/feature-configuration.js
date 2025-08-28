const { logQuery, getCurrentTimestamp } = require("../../commons/helpers");

const FEATURE_CONFIGURATION = {
  NAME: "feature_configuration",
  COLUMNS: {
    FEATURE_GROUP: "feature_group",
    FEATURE: "feature",
    EXECUTION_MODE: "execution_mode",
    FALLBACK_MODE: "fallback_mode",
    OUTLET_ID: "outlet_id"
  }
};

function FeatureConfigurationRepo() {
  async function getFeatureConfigurations({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(FEATURE_CONFIGURATION.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Get Feature Configuration" });

    const featureConfig = await query;

    return featureConfig;
  }

  async function createFeatureConfiguration({ input }) {
    const knex = this;

    const currentTimeStamp = getCurrentTimestamp();
    const query = knex(FEATURE_CONFIGURATION.NAME)
      .returning("*")
      .insert(
        Array.isArray(input)
          ? input.map(val => ({ ...val, last_modified_at: currentTimeStamp, api_version: "v1" }))
          : { ...input, last_modified_at: currentTimeStamp, api_version: "v1" }
      )
      .onConflict([FEATURE_CONFIGURATION.COLUMNS.FEATURE, FEATURE_CONFIGURATION.COLUMNS.OUTLET_ID])
      .merge();
    logQuery({ query, context: "Create Feature Configurations" });

    return query;
  }

  async function updateFeatureConfiguration({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(FEATURE_CONFIGURATION.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update Feature Configuration" });

    const [updatedTerminal] = await query;

    return updatedTerminal;
  }

  async function deleteFeatureConfiguration({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(FEATURE_CONFIGURATION.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete Feature Configuration" });

    const deletedTerminal = await query;

    return deletedTerminal;
  }

  return {
    getFeatureConfigurations,
    createFeatureConfiguration,
    updateFeatureConfiguration,
    deleteFeatureConfiguration
  };
}
module.exports = { FeatureConfigurationRepo, FEATURE_CONFIGURATION };
