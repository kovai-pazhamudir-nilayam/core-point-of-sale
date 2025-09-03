exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version_history");
  if (!tableExists) {
    await knex.schema.createTable("outlet_mac_version_history", table => {
      table
        .uuid("outlet_mac_version_history_id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("outlet_mac_version_id");
      table.string("outlet_id");
      table.string("type");
      table.string("mac_address");
      table.string("service");
      table.string("version");
      table.string("deployment_hash");
      table.timestamp("created_at");
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
      table.string("terminal_id");
      table.string("status");
      table.boolean("is_rollbacked");

      table.index(["outlet_id"], "IDX_OUTLET_MAC_VERSION_HISTORY_OUTLET_ID");
      table.index(["mac_address"], "IDX_OUTLET_MAC_VERSION_HISTORY_MAC_ADDRESS");
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version_history");
  if (tableExists) {
    // Drop the table
    await knex.schema.dropTable("outlet_mac_version_history");
  }
};
