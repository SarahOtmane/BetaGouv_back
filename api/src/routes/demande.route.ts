import express from 'express';
import { postDemande, updateStatut } from '../controllers/demande.controller';
import { authenticate } from '../middlewares/auth.middleware'; // ton middleware existant

const router = express.Router();

router.post('/', authenticate, postDemande);
router.put('/:id/statut', authenticate, updateStatut);

export default router;
