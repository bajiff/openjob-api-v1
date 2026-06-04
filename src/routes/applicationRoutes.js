// src/routes/applicationRoutes.js
import express from 'express';
import { ApplicationController } from '../controllers/ApplicationController.js';
import { validate } from '../middleware/validations.js';
import { applySchema, updateStatusSchema } from '../validators/applicationValidator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Semua route di sini butuh authentication
router.use(authenticate);

router.post('/', validate(applySchema), ApplicationController.apply);
router.get('/', ApplicationController.getAll);
router.get('/:id', ApplicationController.getById);
router.get('/user/:userId', ApplicationController.getByUserId);
router.get('/job/:jobId', ApplicationController.getByJobId);
router.put('/:id', validate(updateStatusSchema), ApplicationController.updateStatus);
router.delete('/:id', ApplicationController.delete);

export default router;
