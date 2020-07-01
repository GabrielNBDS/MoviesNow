import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('episodes', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.string('url').notNullable();
    table.string('episode_number');
    table.integer('content_id').references('id').inTable('content');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('episodes');
}
