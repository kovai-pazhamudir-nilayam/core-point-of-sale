exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_transaction");
  if (!tableExists) {
    await knex.schema.createTable("terminal_transaction", table => {
      table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("outlet_id").notNullable();
      table.string("terminal_id").notNullable();
      table.uuid("register_id");
      table.uuid("user_id");
      table.jsonb("audit");
    });
  }
};
exports.down = knex => {
  return knex.schema.dropTable("terminal_transaction");
};
