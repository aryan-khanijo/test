/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bids", (table) => {
    table.increments("id").primary();
    table.integer("bider_id").unsigned().notNullable();
    table.integer("project_id").unsigned().notNullable();
    table.boolean("approved").defaultTo(false);
	table.integer("amount").unsigned().notNullable();
    table.foreign("bider_id").references("users.id");
    table.foreign("project_id").references("projects.id");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("bids");
};
