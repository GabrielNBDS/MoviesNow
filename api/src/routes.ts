import express from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import ContentController from './controllers/ContentController';
import EpisodesController from './controllers/EpisodesController';

const routes = express.Router();
const upload = multer(uploadConfig);

const contentController = new ContentController();
const episodesController = new EpisodesController();

routes.get('/content', contentController.index);
routes.get('/content/:id', contentController.show);
routes.post('/content', upload.single('thumbnail'), contentController.create);

routes.get('/episodes/:id', episodesController.index);
routes.get('/episodes/:id', episodesController.show);
routes.post('/episodes/:id', upload.single('video'), episodesController.create);

export default routes;
