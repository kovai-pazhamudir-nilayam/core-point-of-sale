exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_transaction");
  if (tableExists) {
    await knex.schema.table("terminal_transaction", table => {
      table.string("order_number");
      table.string("register_transaction_id");
      table.jsonb("order_amount");
      table.jsonb("payment_methods");
      table.timestamp("created_at");
      table.timestamp("last_modified_at");
      table.dropColumn("audit");
      table.unique(["outlet_id", "order_number"]);
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal_transaction");
  if (tableExists) {
    await knex.schema.table("terminal_transaction", table => {
      table.dropColumn("order_number");
      table.dropColumn("register_transaction_id");
      table.dropColumn("order_amount");
      table.dropColumn("payment_methods");
      table.dropColumn("created_at");
      table.dropColumn("last_modified_at");
    });
  }
};
