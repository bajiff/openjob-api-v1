// src/routes/documentRoutes.js
import express from 'express';
import { DocumentController } from '../controllers/DocumentController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', DocumentController.getAll);
router.get('/:id', DocumentController.getById);

// Protected routes
router.post('/', authenticate, upload.single('document'), DocumentController.upload);
router.delete('/:id', authenticate, DocumentController.delete);

export default router;
