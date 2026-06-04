// src/routes/categoryRoutes.js
import express from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import { validate } from '../middleware/validations.js';
import { categorySchema } from '../validators/categoryValidator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);

// Protected routes
router.post('/', authenticate, validate(categorySchema), CategoryController.create);
router.put('/:id', authenticate, validate(categorySchema), CategoryController.update);
router.delete('/:id', authenticate, CategoryController.delete);

export default router;
