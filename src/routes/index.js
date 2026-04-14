// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Semua endpoint user akan diawali dengan /users
router.use('/users', userRoutes);

// Nanti kita tambahkan:
// router.use('/companies', companyRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/jobs', jobRoutes);
// router.use('/authentications', authRoutes);
// ... dll

export default router;