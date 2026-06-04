// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import companyRoutes from './companyRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import jobRoutes from './jobRoutes.js';
import applicationRoutes from './applicationRoutes.js';
import bookmarkRoutes from './bookmarkRoutes.js';
import documentRoutes from './documentRoutes.js';
import profileRoutes from './profileRoutes.js';

const router = express.Router();

// Mount routes
router.use('/users', userRoutes);
router.use('/authentications', authRoutes);
router.use('/companies', companyRoutes);
router.use('/categories', categoryRoutes);
router.use('/jobs', jobRoutes);
router.use('/applications', applicationRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/documents', documentRoutes);
router.use('/profile', profileRoutes);

export default router;