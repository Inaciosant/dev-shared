import { Request, Response } from 'express';
import { uploadImageToCloudinary } from '../../services/cloudinary/uploadImage';

type UploadFolder = 'avatars' | 'setups' | 'general';

const allowedFolders = new Set<UploadFolder>(['avatars', 'setups', 'general']);

export class UploadController {
  async image(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: 'Imagem nao enviada. Use o campo "image".' });
    }

    const requestedFolder = String(req.body.folder ?? req.query.folder ?? 'general') as UploadFolder;
    const folder = allowedFolders.has(requestedFolder) ? requestedFolder : 'general';

    const result = await uploadImageToCloudinary(req.file.buffer, folder);

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      format: result.format
    });
  }
}
