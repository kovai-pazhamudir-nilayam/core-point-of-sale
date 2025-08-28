const { logQuery } = require("../../commons/helpers");

const DENOMINATION_CONFIG = {
  NAME: "denomination_config",
  COLUMNS: {
    DENOMINATION_CONFIG_ID: "denomination_config_id",
    DENOMINATION_AMOUNT: "denomination_amount",
    TYPE: "type",
    IS_ACTIVE: "is_active",
    CREATED_AT: "created_at",
    CREATED_BY: "created_by",
    LAST_MODIFIED_AT: "last_modified_at",
    LAST_MODIFIED_BY: "last_modified_by"
  }
};

function DenominationConfigRepo() {
  async function getDenominationConfig({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(DENOMINATION_CONFIG.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Get Denomination Config" });

    const response = await query;

    return response;
  }

  async function createDenominationConfig({ input }) {
    const knex = this;

    const { created_by, created_at, last_modified_by, last_modified_at, ...rest } = input;

    const query = knex(DENOMINATION_CONFIG.NAME)
      .returning("*")
      .insert({ ...rest, created_by, created_at })
      .onConflict(DENOMINATION_CONFIG.COLUMNS.DENOMINATION_CONFIG_ID)
      .merge({ ...rest, last_modified_by, last_modified_at });

    logQuery({ query, context: "Create Denomination Config" });

    const [response] = await query;

    return response;
  }

  async function updateDenominationConfig({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(DENOMINATION_CONFIG.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update Denomination Config" });

    const [response] = await query;

    return response;
  }

  async function deleteDenominationConfig({ filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(DENOMINATION_CONFIG.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Delete Denomination Config" });

    const response = await query;

    return response;
  }

  return {
    getDenominationConfig,
    createDenominationConfig,
    updateDenominationConfig,
    deleteDenominationConfig
  };
}
module.exports = { DenominationConfigRepo, DENOMINATION_CONFIG };
