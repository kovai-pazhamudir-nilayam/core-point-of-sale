exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_usage");
  if (!tableExists) {
    await knex.schema.createTable("terminal_usage", table => {
      table.uuid("terminal_usage_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("outlet_id").notNullable();
      table.string("terminal_id").notNullable();
      table.uuid("user_id");
      table.string("pos_mode");
      table.timestamp("logged_in_at");
      table.timestamp("logged_out_at");
      table.uuid("forced_logout_by");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("last_modified_at");
      table.string("api_version");

      table.index(["user_id"], "TERMINAL_USAGE_USER_ID");
      table.index(["outlet_id", "terminal_id"], "TERMINAL_USAGE_OUTLET_TERMINAL");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("terminal_usage");
};
