import { Request, Response } from 'express';
import knex from '../database/connection';

class GenresController {
  async index(request: Request, response: Response): Promise<Response> {
    const genres = await knex('genres');

    return response.json(genres);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const episode = await knex('genres').where('id', id).first();

    if (!episode) {
      return response.status(400).json({ message: 'Genre not found.' });
    }

    return response.json(episode);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const newGenre = await knex('genres').insert({ name });

    return response.json(newGenre);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await knex('genres').where('id', '=', id).del();

    return response.json({ message: 'deleted' });
  }
}

export default GenresController;
