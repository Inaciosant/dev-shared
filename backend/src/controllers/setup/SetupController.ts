import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Setup } from '../../models/Setup';
import { Comment } from '../../models/Comment';
import { uploadImageToCloudinary } from '../../services/cloudinary/uploadImage';

const parseJsonField = <T>(value: unknown, fallback: T): T => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') return value as T;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const normalizeSetupBody = (body: Record<string, unknown>) => {
  const normalized: Record<string, unknown> = { ...body };

  if ('gears' in normalized) normalized.gears = parseJsonField(normalized.gears, []);
  if ('softwareStack' in normalized) normalized.softwareStack = parseJsonField(normalized.softwareStack, []);
  if ('tags' in normalized) normalized.tags = parseJsonField(normalized.tags, []);

  return normalized;
};

export class SetupController {


  async create(req: Request, res: Response) {
    try {
      const setupData: Record<string, unknown> = { ...normalizeSetupBody(req.body as Record<string, unknown>), user: req.userId };

      if (req.file) {
        const upload = await uploadImageToCloudinary(req.file.buffer, 'setups');
        setupData.thumbnail = upload.secure_url;
      }

      const setup = await Setup.create(setupData);
      return res.status(201).json(setup);
    } catch (error) {
  return res.status(400).json({
    error: 'Erro ao criar o setup. Verifica os dados enviados.',
    details: error instanceof Error ? error.message : String(error)
  });
    }
  }


  async index(req: Request, res: Response) {
    try {
      const { role, tag } = req.query;
      const filter: any = {};

      if (role) filter.workRole = { $regex: role, $options: 'i' };
      if (tag) filter.tags = tag;

      const setups = await Setup.find(filter)
        .populate('user', 'name avatar workRole')
        .sort({ createdAt: -1 });

      return res.json(setups);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar setups.' });
    }
  }


  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const setup = await Setup.findById(id).populate('user', 'name avatar githubUrl');

      if (!setup) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const comments = await Comment.find({ setup: id })
        .populate('user', 'name avatar')
        .sort({ createdAt: -1 });

      return res.json({ setup, comments });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao carregar os detalhes do setup.' });
    }
  }


  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const setup = await Setup.findById(id);

      if (!setup) return res.status(404).json({ error: 'Setup não encontrado.' });

      if (setup.user.toString() !== req.userId) {
        return res.status(403).json({ error: 'Não tens permissão para editar este setup.' });
      }

      const updateData: Record<string, unknown> = normalizeSetupBody(req.body as Record<string, unknown>);

      if (req.file) {
        const upload = await uploadImageToCloudinary(req.file.buffer, 'setups');
        updateData.thumbnail = upload.secure_url;
      }

      const updatedSetup = await Setup.findByIdAndUpdate(id, updateData, { new: true });
      return res.json(updatedSetup);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o setup.' });
    }
  }


  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(404).json({ error: 'Setup não encontrado.' });
      }

      const setup = await Setup.findById(id);

      if (!setup) return res.status(404).json({ error: 'Setup não encontrado.' });

      if (setup.user.toString() !== req.userId) {
        return res.status(403).json({ error: 'Não tens permissão para apagar este setup.' });
      }

      await setup.deleteOne();

      await Comment.deleteMany({ setup: id });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao apagar o setup.' });
    }
  }
}
