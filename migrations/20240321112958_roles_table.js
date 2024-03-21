/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.timestamps(true, true);
  });

  await knex("roles").insert(
    ["admin", "user"].map((name) => ({ name, description: `${name} role` }))
  );
  return;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("roles");
};
