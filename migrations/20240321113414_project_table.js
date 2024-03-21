/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").nullable();
    table.boolean("isActive").defaultTo(false);
    table.dateTime("expiry").notNullable();
    table.integer("owner_id").unsigned().notNullable();
    table.foreign("owner_id").references("users.id");
    table.integer("assignee").unsigned().nullable();
    table.foreign("assignee").references("users.id");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("projects");
};
