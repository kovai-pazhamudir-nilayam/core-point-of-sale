exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.jsonb("closing_float_cash").defaultTo(null);
    });
  }
};
exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.dropColumn("closing_float_cash");
    });
  }
};
