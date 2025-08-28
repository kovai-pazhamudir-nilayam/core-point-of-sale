const { logQuery } = require("../../commons/helpers");

const OUTLET_MAC_VERSION = {
  NAME: "outlet_mac_version",
  COLUMNS: {
    OUTLET_MAC_VERSION_ID: "outlet_mac_version_id",
    TERMINAL_ID: "terminal_id",
    TYPE: "type",
    MAC_ADDRESS: "mac_address",
    DEPLOYMENT_HASH: "deployment_hash",
    VERSION: "version"
  }
};

function OutletMacVersionRepo() {
  async function getOutletMacVersion({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;
    const { where: whereClause } = filters;

    const query = knex(OUTLET_MAC_VERSION.NAME).select(fieldsToReturn);
    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Get outlet mac version" });

    const response = await query;

    return response;
  }

  async function createOutletMacVersion({ input }) {
    const knex = this;
    const { audit, updateAudit, ...rest } = input;
    const query = knex(OUTLET_MAC_VERSION.NAME)
      .returning("*")
      .insert({ ...rest, ...audit })
      .onConflict([OUTLET_MAC_VERSION.COLUMNS.OUTLET_MAC_VERSION_ID])
      .merge({ ...rest, ...updateAudit });
    logQuery({ query, context: "Create outlet mac version" });
    return query;
  }

  return {
    getOutletMacVersion,
    createOutletMacVersion
  };
}

module.exports = { OutletMacVersionRepo, OUTLET_MAC_VERSION };
