import { Router } from 'express';
import { isValidObjectId, type Model } from 'mongoose';

type ResourceRouterOptions = {
  sort?: Record<string, 1 | -1>;
};

export function createResourceRouter(model: Model<any>, options: ResourceRouterOptions = {}) {
  const router = Router();
  const sort = options.sort ?? { createdAt: -1 as const };

  router.get('/', async (_req, res) => {
    const records = await model.find().sort(sort).exec();
    res.json(records);
  });

  router.get('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid resource id' });
    }

    const record = await model.findById(req.params.id).exec();
    if (!record) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(record);
  });

  router.post('/', async (req, res) => {
    const record = await model.create(req.body);
    res.status(201).json(record);
  });

  router.patch('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid resource id' });
    }

    const record = await model
      .findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .exec();
    if (!record) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(record);
  });

  router.delete('/:id', async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid resource id' });
    }

    const record = await model.findByIdAndDelete(req.params.id).exec();
    if (!record) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.status(204).end();
  });

  return router;
}