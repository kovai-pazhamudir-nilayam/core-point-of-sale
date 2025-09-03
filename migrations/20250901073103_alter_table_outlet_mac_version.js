exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    await knex.schema.alterTable("outlet_mac_version", table => {
      table.boolean("is_rollbacked").defaultTo(false);
      table.dropColumn("last_deployed_at");

      // Add indexes using schema builder
      table.index(["outlet_id"], "IDX_OUTLET_MAC_VERSION_OUTLET_ID");
      table.index(["mac_address"], "IDX_OUTLET_MAC_VERSION_MAC_ADDRESS");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (tableExists) {
    // Revert columns
    await knex.schema.alterTable("outlet_mac_version", table => {
      table.dropColumn("is_rollbacked");
      table.timestamp("last_deployed_at");
    });
  }
};
