import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as internshipController from '../controllers/internship.controller';

const router = Router();

router.post('/', authenticate, internshipController.create);
router.get('/', authenticate, internshipController.getAll);
router.put('/:id', authenticate, internshipController.update);
router.delete('/:id', authenticate, internshipController.remove);

export default router;
