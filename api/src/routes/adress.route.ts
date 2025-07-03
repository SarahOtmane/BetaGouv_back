import { Router } from 'express';
import * as adressController from '../controllers/adress.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, adressController.createAdress);
router.get('/:id', authenticate, adressController.getAdressById);

export default router;
