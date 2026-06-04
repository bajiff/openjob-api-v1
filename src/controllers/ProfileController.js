// src/controllers/ProfileController.js
import { User } from '../models/User.js';
import { Application } from '../models/Application.js';
import { Bookmark } from '../models/Bookmark.js';
import { successResponse } from '../utils/response.js';

export const ProfileController = {
  async getProfile(req, res, next) {
    try {
      const user_id = req.user.id;
      const user = await User.findById(user_id);
      if (!user) {
        const error = new Error('User tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Profil berhasil diambil', { user });
    } catch (error) {
      next(error);
    }
  },

  async getApplications(req, res, next) {
    try {
      const user_id = req.user.id;
      const applications = await Application.findByUserId(user_id);
      return successResponse(res, 200, 'Daftar lamaran saya berhasil diambil', { applications });
    } catch (error) {
      next(error);
    }
  },

  async getBookmarks(req, res, next) {
    try {
      const user_id = req.user.id;
      const bookmarks = await Bookmark.findByUserId(user_id);
      return successResponse(res, 200, 'Daftar bookmark saya berhasil diambil', { bookmarks });
    } catch (error) {
      next(error);
    }
  }
};
