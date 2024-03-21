/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.raw(`SELECT cron.schedule('Auto Assign', '0 0 * * *', '
	with(select * from projects where expiry <= NOW()) as proj
	(update project set assignee = (select bidder_id from bids where project_id = project.id) where id in (proj.id))
  ');`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
