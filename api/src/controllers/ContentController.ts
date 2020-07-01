import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import knex from '../database/connection';

class ContentController {
  async index(request: Request, response: Response): Promise<Response> {
    const { genres } = request.query;

    if (!genres) {
      const contents = await knex.select().table('content');

      return response.json(contents);
    }

    const parsedGenres = String(genres)
      .split(',')
      .map(item => Number(item.trim()));

    const contents = await knex('content')
      .join('content_genres', 'content.id', '=', 'content_genres.content_id')
      .whereIn('content_genres.genre_id', parsedGenres)
      .select('content.*');

    return response.json(contents);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const content = await knex('content').where('id', id).first();

    if (!content) {
      return response.status(400).json({ message: 'Point not found.' });
    }

    const genres = await knex('genres')
      .join('content_genres', 'genres.id', '=', 'content_genres.genre_id')
      .where('content_genres.content_id', id)
      .select('genres.name');

    const episodes = await knex('episodes').where('content_id', '=', id);

    return response.json({ content, genres, episodes });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, genres } = request.body;
    const { filename, path: filePath, destination } = request.file;

    const parsedName = name.replace(' ', '');

    fs.mkdir(
      path.resolve(destination, parsedName),
      { recursive: true },
      err => {
        if (err) throw err;
      },
    );

    const trx = await knex.transaction();

    let content;
    if (description) {
      content = {
        name,
        thumbnail: `http://localhost:3333/thumbnails/${parsedName}/${filename}`,
        description,
      };
    } else {
      content = {
        name,
        thumbnail: `http://localhost:3333/thumbnails/${parsedName}/${filename}`,
      };
    }

    const [contentId] = await trx('content').insert(content);

    const parsedGenres = String(genres)
      .split(',')
      .map(item => Number(item.trim()));

    const contentGenres = parsedGenres.map((genreId: number) => {
      return {
        genre_id: genreId,
        content_id: contentId,
      };
    });

    await trx('content_genres').insert(contentGenres);

    await trx.commit();

    await sharp(filePath)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(destination, parsedName, filename));

    fs.unlinkSync(filePath);

    return response.json({
      id: contentId,
      ...content,
    });
  }
}

export default ContentController;
