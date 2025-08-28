exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_mac_version");
  if (!tableExists) {
    await knex.schema.createTable("outlet_mac_version", table => {
      table.uuid("outlet_mac_version_id").primary();
      table.string("outlet_id");
      table.string("type");
      table.string("mac_address");
      table.string("service");
      table.string("version");
      table.string("deployment_hash");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("outlet_mac_version");
};
