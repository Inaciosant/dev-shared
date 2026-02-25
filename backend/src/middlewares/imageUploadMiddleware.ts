import multer from 'multer';

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_SIZE_BYTES
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Arquivo invalido. Envie apenas imagens.'));
      return;
    }

    cb(null, true);
  }
});

export { imageUpload, MAX_IMAGE_SIZE_BYTES };
