// src/routes/userRoutes.js
import express from 'express';
import { UserController } from '../controllers/UserController.js';
import { validate } from '../middleware/validations.js';
import { registerSchema } from '../validators/userValidator.js';

const router = express.Router();

// Public routes
router.post('/', validate(registerSchema), UserController.register);

router.get('/:id', UserController.getUserById);

export default router;