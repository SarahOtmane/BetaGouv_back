import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as statController from '../controllers/stat.controller';

const router = Router();

router.post('/', authenticate, statController.create);
router.get('/', authenticate, statController.getAll);
router.put('/:id', authenticate, statController.update);
router.delete('/:id', authenticate, statController.remove);

export default router;
