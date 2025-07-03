import { Router } from 'express';
import * as schoolController from '../controllers/school.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/website', authenticate, schoolController.addWebsiteToSchool);
router.get('/', authenticate, schoolController.getSchool);

export default router;