
exports.up = function(knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id');
    table.string('desc').notNullable();
    table.datetime('estimateAt');
    table.datetime('doneAt');
    table.integer('userId').notNullable();

    table.foreign('userId').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
