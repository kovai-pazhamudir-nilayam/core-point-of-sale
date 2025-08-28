exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register_hold");
  if (!tableExists) {
    await knex.schema.createTable("terminal_register_hold", table => {
      table.uuid("terminal_register_hold_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("register_id");
      table.string("register_hold_by");
      table.string("register_hold_at");
      table.string("register_resume_by");
      table.string("register_resume_at");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
      table.string("api_version");

      table.index(["register_id"], "TERMINAL_REGISTER_HOLD_REGISTER_ID");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("terminal_register_hold");
};
