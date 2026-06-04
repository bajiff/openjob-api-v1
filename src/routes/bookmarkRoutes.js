// src/routes/bookmarkRoutes.js
import express from 'express';
import { BookmarkController } from '../controllers/BookmarkController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Semua route bookmark butuh authentication
router.use(authenticate);

router.get('/', BookmarkController.getByUser);

export default router;
