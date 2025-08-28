exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  const tableExists = await knex.schema.hasTable("terminal");
  if (!tableExists) {
    await knex.schema.createTable("terminal", table => {
      table.string("terminal_id").notNullable();
      table.string("terminal_name");
      table.string("outlet_id").notNullable();
      table.string("status");
      table.boolean("is_edc_integrated");
      table.boolean("is_weighing_scale_integrated");
      table.jsonb("edc_device");
      table.jsonb("printer_device");
      table.boolean("is_active");
      table.jsonb("last_usage");
      table.jsonb("custom_info");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");

      table.unique(["terminal_id", "outlet_id"]);
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("terminal");
};
