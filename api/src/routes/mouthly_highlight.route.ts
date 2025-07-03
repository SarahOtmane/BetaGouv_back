import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as highlightController from '../controllers/mouthly_highlight.controller';

const router = Router();

router.post('/', authenticate, highlightController.create);
router.get('/', authenticate, highlightController.getAll);
router.put('/:id', authenticate, highlightController.update);
router.delete('/:id', authenticate, highlightController.remove);

export default router;
