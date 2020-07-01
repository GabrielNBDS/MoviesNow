import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('content_genres', table => {
    table.increments('id').primary();

    table
      .integer('content_id')
      .notNullable()
      .references('id')
      .inTable('content');
    table.integer('genre_id').notNullable().references('id').inTable('genres');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('content_genres');
}
