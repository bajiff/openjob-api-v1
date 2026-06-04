// src/routes/companyRoutes.js
import express from 'express';
import { CompanyController } from '../controllers/CompanyController.js';
import { validate } from '../middleware/validations.js';
import { companySchema } from '../validators/companyValidator.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', CompanyController.getAll);
router.get('/:id', CompanyController.getById);

// Protected routes
router.post('/', authenticate, validate(companySchema), CompanyController.create);
router.put('/:id', authenticate, validate(companySchema), CompanyController.update);
router.delete('/:id', authenticate, CompanyController.delete);

export default router;
