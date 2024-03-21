/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcrypt')

exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.integer("role_id").unsigned().notNullable();
    table.foreign("role_id").references("roles.id");
    table.timestamps(true, true);
  });

//   seeding primary admin
  const salt = await bcrypt.genSalt(10);
  const role = await knex('roles').select('id').where('name', 'admin');
  await knex('users').insert({
	name: "admin",
	username: "admin@test.com",
	password: await bcrypt.hash('admin123', salt),
	role_id: role[0].id
  });
  return;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable("users");
};
