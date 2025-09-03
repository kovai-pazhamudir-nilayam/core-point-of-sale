exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("outlet_devices");
  if (!tableExists) {
    await knex.schema.createTable("outlet_devices", table => {
      table.uuid("outlet_device_register_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("outlet_id");
      table.string("mac_address");
      table.string("type");
      table.string("mac_short_name");
      table.boolean("is_active");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("outlet_devices");
};
