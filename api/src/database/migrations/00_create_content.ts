import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('content', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.string('thumbnail').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('content');
}
