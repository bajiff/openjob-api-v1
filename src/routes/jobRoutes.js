// src/routes/jobRoutes.js
import express from 'express';
import { JobController } from '../controllers/JobController.js';
import { validate } from '../middleware/validations.js';
import { jobSchema } from '../validators/jobValidator.js';
import { authenticate } from '../middleware/auth.js';

import { BookmarkController } from '../controllers/BookmarkController.js';

const router = express.Router();

// Public routes
router.get('/', JobController.getAll);
router.get('/:id', JobController.getById);
router.get('/company/:companyId', JobController.getByCompanyId);
router.get('/category/:categoryId', JobController.getByCategoryId);

// Protected routes
router.post('/', authenticate, validate(jobSchema), JobController.create);
router.put('/:id', authenticate, validate(jobSchema), JobController.update);
router.delete('/:id', authenticate, JobController.delete);

// Nested bookmark routes (protected)
router.post('/:jobId/bookmark', authenticate, BookmarkController.create);
router.get('/:jobId/bookmark/:id', authenticate, BookmarkController.getById);
router.delete('/:jobId/bookmark', authenticate, BookmarkController.deleteByUserAndJob);

export default router;
