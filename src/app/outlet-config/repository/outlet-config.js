const { logQuery } = require("../../commons/helpers");
const { getCurrentTimeStamp } = require("../../terminal/mappers/audit-mapper");

const OUTLET_CONFIG = {
  NAME: "outlet_config",
  COLUMNS: {
    OUTLET_ID: "outlet_id",
    ZONE_ID: "zone_id",
    ZONE_SHORT_CODE: "zone_short_code",
    ALLOWED_POS_IPS: "allowed_pos_ips",
    ALLOWED_POS_MODES: "allowed_pos_modes",
    QUANTITY_EDIT_MODE: "quantity_edit_mode",
    LINE_DELETE_MODE: "line_delete_mode",
    IS_ACTIVE: "is_active"
  }
};

function OutletConfigRepo() {
  async function getOutletConfig({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_CONFIG.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Get outlet config" });

    const outletConfig = await query;

    return outletConfig;
  }

  async function createOutletConfig({ input }) {
    const knex = this;
    const currentTimeStamp = getCurrentTimeStamp();

    const query = knex(OUTLET_CONFIG.NAME)
      .returning("*")
      .insert(
        Array.isArray(input)
          ? input.map(val => ({ ...val, last_modified_at: currentTimeStamp }))
          : { ...input, last_modified_at: currentTimeStamp }
      )
      .onConflict([OUTLET_CONFIG.COLUMNS.OUTLET_ID])
      .merge();
    logQuery({ query, context: "Create outlet config" });
    return query;
  }

  async function updateOutletConfig({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(OUTLET_CONFIG.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update outlet config" });

    const [updatedOutlet] = await query;

    return updatedOutlet;
  }

  async function deleteOutletConfig({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_CONFIG.NAME).delete();

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete outlet config" });

    const deletedOutlet = await query;

    return deletedOutlet;
  }

  return {
    getOutletConfig,
    updateOutletConfig,
    deleteOutletConfig,
    createOutletConfig
  };
}
module.exports = { OutletConfigRepo, OUTLET_CONFIG };
