const { logQuery } = require("../../commons/helpers");

const OUTLET_DEVICE = {
  NAME: "outlet_devices",
  COLUMNS: {
    OUTLET_DEVICE_REGISTER_ID: "outlet_device_register_id",
    OUTLET_ID: "outlet_id",
    ENTITY_TYPE: "entity_type",
    ENTITY_VALUE: "entity_value",
    MAC_ADDRESS: "mac_address",
    MAC_SHORT_NAME: "mac_short_name",
    IS_ACTIVE: "is_active"
  }
};

function OutletDeviceRepo() {
  async function getOutletDevice({ filters = {}, fieldsToReturn = "*" }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_DEVICE.NAME).select(fieldsToReturn);

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Get outlet devices" });

    const response = await query;

    return response;
  }

  async function createOutletDevice({ input }) {
    const knex = this;
    const { created_by, created_at, last_modified_by, last_modified_at, ...rest } = input;

    const query = knex(OUTLET_DEVICE.NAME)
      .returning("*")
      .insert({ ...rest, created_by, created_at })
      .onConflict([OUTLET_DEVICE.COLUMNS.OUTLET_DEVICE_REGISTER_ID])
      .merge({ ...rest, last_modified_by, last_modified_at });
    logQuery({ query, context: "Create outlet device" });

    const [response] = await query;
    return response;
  }

  async function updateOutletDevice({ input, filters = {} }) {
    const knex = this;

    const { where: whereClause } = filters;

    const query = knex(OUTLET_DEVICE.NAME).returning("*").update(input);

    if (whereClause) {
      query.where(whereClause);
    }

    logQuery({ query, context: "Update outlet device" });

    const [response] = await query;

    return response;
  }

  async function deleteOutletDevice({ filters = {} }) {
    const knex = this;

    const { where: whereClause, whereIn: whereInClause } = filters;

    const query = knex(OUTLET_DEVICE.NAME).delete().returning("*");

    if (whereClause) {
      query.where(whereClause);
    }

    if (whereInClause?.columns && whereInClause?.values) {
      query.whereIn(whereInClause.columns, whereInClause.values);
    }

    logQuery({ query, context: "Delete outlet device" });

    const [response] = await query;

    return response;
  }

  return {
    getOutletDevice,
    createOutletDevice,
    updateOutletDevice,
    deleteOutletDevice
  };
}
module.exports = { OutletDeviceRepo, OUTLET_DEVICE };
