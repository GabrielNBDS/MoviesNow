import Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export async function seed(knex: Knex): Promise<void> {
  await knex('genres').insert([
    { name: 'Ação' },
    { name: 'Animação' },
    { name: 'Aventura' },
    { name: 'Cinema de arte' },
    { name: 'Chanchada' },
    { name: 'Comédia' },
    { name: 'Comédia de ação' },
    { name: 'Comédia de terror' },
    { name: 'Comédia dramática' },
    { name: 'Comédia romântica' },
    { name: 'Dança' },
    { name: 'Documentário' },
    { name: 'Docuficção' },
    { name: 'Drama' },
    { name: 'Espionagem' },
    { name: 'Faroeste' },
    { name: 'Fantasia científica' },
    { name: 'Ficção científica' },
    { name: 'Filmes de guerra' },
    { name: 'Musical' },
    { name: 'Filme policial' },
    { name: 'Romance' },
    { name: 'Seriado' },
    { name: 'Suspense' },
    { name: 'Terror' },
    { name: 'Thriller' },
  ]);
}
