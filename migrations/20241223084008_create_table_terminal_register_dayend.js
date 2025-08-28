exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register_dayend");
  if (!tableExists) {
    await knex.schema.createTable("terminal_register_dayend", table => {
      table.uuid("register_transaction_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.jsonb("register_transaction_summary");
      table.uuid("reconciliation_close_by");
      table.string("reconciliation_notes");
      table.string("reconciliation_status");
      table.string("api_version");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.string("created_by");
      table.timestamp("last_modified_at");
      table.string("last_modified_by");
    });
  }
};

exports.down = knex => {
  return knex.schema.dropTable("terminal_register_dayend");
};
