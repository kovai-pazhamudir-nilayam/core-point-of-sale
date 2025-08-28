exports.up = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("is_weighing_scale_integrated"); // Drop the old column
      table.jsonb("weighing_scale_device"); // Add the new jsonb column
    });
  }
};

exports.down = async knex => {
  const tableExists = await knex.schema.hasTable("terminal");
  if (tableExists) {
    await knex.schema.table("terminal", table => {
      table.dropColumn("weighing_scale_device"); // Drop the new column
      table.boolean("is_weighing_scale_integrated"); // Re-add the old column (assuming it was a boolean)
    });
  }
};
