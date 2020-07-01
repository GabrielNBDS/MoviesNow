import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(request, file, callback) {
      const filename = file.originalname
        .replace(/ /g, '')
        .replace('(', '')
        .replace(')', '');
      return callback(null, filename);
    },
  }),
};
