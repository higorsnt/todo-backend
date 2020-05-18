
exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id');
    table.string('desc').notNullable();
    table.datetime('estimate_at');
    table.datetime('done_at');
    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
