exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (!tableExists) {
    await knex.schema.createTable("terminal_register", table => {
      table.uuid("register_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("outlet_id").notNullable();
      table.string("terminal_id").notNullable();
      table.string("register_status");
      table.timestamp("action_at");
      table.integer("float_cash");
      table.jsonb("register_transaction_summary");
      table.uuid("register_open_by");
      table.timestamp("register_open_at");
      table.uuid("register_close_by");
      table.timestamp("register_close_at");
      table.jsonb("register_hold");
      table.uuid("forced_close_by");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("terminal_register");
};
