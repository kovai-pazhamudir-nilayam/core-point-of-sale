exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.dropColumn("float_cash");
    });

    await knex.schema.table("terminal_register", table => {
      table.jsonb("float_cash");
    });
  }
};
exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_register");
  if (tableExists) {
    await knex.schema.table("terminal_register", table => {
      table.dropColumn("float_cash");
    });

    await knex.schema.table("terminal_register", table => {
      table.integer("float_cash");
    });
  }
};
