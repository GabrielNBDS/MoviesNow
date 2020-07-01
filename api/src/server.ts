import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  '/thumbnails',
  express.static(path.resolve(__dirname, '..', 'uploads')),
);

app.use('/videos', express.static(path.resolve(__dirname, '..', 'uploads')));

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server Started'));
