// src/routes/profileRoutes.js
import express from 'express';
import { ProfileController } from '../controllers/ProfileController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Semua endpoint profile butuh authentication
router.use(authenticate);

router.get('/', ProfileController.getProfile);
router.get('/applications', ProfileController.getApplications);
router.get('/bookmarks', ProfileController.getBookmarks);

export default router;
