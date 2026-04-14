// src/routes/index.js
import express from 'express';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Semua endpoint user akan langsung di /users
router.use('/users', userRoutes);

// Nanti ditambahkan route lain...
// router.use('/companies', companyRoutes);

export default router;