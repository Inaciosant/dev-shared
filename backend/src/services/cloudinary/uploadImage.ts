import { UploadApiResponse } from 'cloudinary';
import { getCloudinary } from '../../config/cloudinary';

type UploadFolder = 'avatars' | 'setups' | 'general';

export const uploadImageToCloudinary = (
  fileBuffer: Buffer,
  folder: UploadFolder = 'general'
): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const cloudinary = getCloudinary();

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `dev-shared/${folder}`,
        resource_type: 'image'
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error('Falha ao enviar imagem para o Cloudinary.'));
          return;
        }

        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
