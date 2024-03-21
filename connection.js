// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config = require("./knexfile");

const knex = require("knex")(config);

knex('roles').select('id').where('name', 'admin').then((res) =>
	console.log(res)
)

module.exports = require('knex')(config);