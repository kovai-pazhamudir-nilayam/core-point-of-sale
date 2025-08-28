exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.uuid("register_transaction_id").defaultTo(knex.raw("uuid_generate_v4()"));
    });
  }
};
exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.dropColumn("register_transaction_id");
    });
  }
};
