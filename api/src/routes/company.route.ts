import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { updateCompanyInfos } from '../controllers/company.controller';

const router = Router();

router.put('/update', authenticate, updateCompanyInfos);

export default router;
