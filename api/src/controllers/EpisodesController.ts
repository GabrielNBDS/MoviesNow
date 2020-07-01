import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import knex from '../database/connection';

class EpisodesController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ message: 'Episodes not found.' });
    }

    const episodes = await knex('episodes')
      .where('content_id', '=', id)
      .select('episodes.*');

    return response.json(episodes);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const episode = await knex('episodes').where('id', id).first();

    if (!episode) {
      return response.status(400).json({ message: 'Episode not found.' });
    }

    return response.json(episode);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, episode_number } = request.body;
    const { id } = request.params;

    const { filename, destination, path: filePath } = request.file;

    let episode;

    if (name) {
      if (description) {
        episode = {
          name,
          description,
          episode_number,
          content_id: id,
          url: `http://localhost:3333/videos/${id}/${filename}`,
        };
      } else {
        episode = {
          name,
          episode_number,
          content_id: id,
          url: `http://localhost:3333/videos/${id}/${filename}`,
        };
      }
    } else {
      episode = {
        episode_number,
        content_id: id,
        url: `http://localhost:3333/videos/${id}/${filename}`,
      };
    }

    const [currentId] = await knex('episodes').insert(episode);

    fs.mkdir(
      path.resolve(__dirname, '..', '..', 'uploads', id),
      { recursive: true },
      err => {
        if (err) throw err;
      },
    );

    fs.rename(
      path.resolve(filePath),
      path.resolve(destination, id, filename),
      err => {
        if (err) throw err;
      },
    );

    return response.json({
      id: currentId,
      ...episode,
    });
  }
}

export default EpisodesController;
