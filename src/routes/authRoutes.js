// src/routes/authRoutes.js
import express from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validate } from '../middleware/validation.js';
import { loginSchema, refreshTokenSchema } from '../validators/authValidator.js';
import { authenticate } from '../middleware/auth.js'; // Nanti kita buat

const router = express.Router();

// Public endpoints
router.post('/', validate(loginSchema), AuthController.login);
router.put('/', validate(refreshTokenSchema), AuthController.refreshToken);

// Protected endpoint (logout butuh authentication)
router.delete('/', authenticate, AuthController.logout);

export default router;