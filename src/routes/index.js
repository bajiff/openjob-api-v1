// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Semua endpoint user akan langsung di /users
router.use('/users', userRoutes);
router.use('/authentications', authRoutes); // Endpoint login/logout

// Nanti ditambahkan route lain...
// router.use('/companies', companyRoutes);

export default router;