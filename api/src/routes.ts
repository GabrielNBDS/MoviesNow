import express from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import ContentController from './controllers/ContentController';
import EpisodesController from './controllers/EpisodesController';
import GenresController from './controllers/GenresController';

const routes = express.Router();
const upload = multer(uploadConfig);

const contentController = new ContentController();
const episodesController = new EpisodesController();
const genresController = new GenresController();

routes.get('/content', contentController.index);
routes.get('/content/:id', contentController.show);
routes.delete('/content/:id', contentController.delete);
routes.post('/content', upload.single('thumbnail'), contentController.create);

routes.get('/episodes/:id', episodesController.index);
routes.get('/episodes/:id', episodesController.show);
routes.post('/episodes/:id', upload.single('video'), episodesController.create);

routes.get('/genres', genresController.index);
routes.get('/genres/:id', genresController.show);
routes.post('/genres', genresController.create);
routes.delete('/genres/:id', genresController.delete);

export default routes;
