// src/controllers/BookmarkController.js
import { Bookmark } from '../models/Bookmark.js';
import { Job } from '../models/Job.js';
import { successResponse } from '../utils/response.js';

export const BookmarkController = {
  async create(req, res, next) {
    try {
      const { jobId } = req.params;
      const user_id = req.user.id;

      // Cek apakah job valid
      const job = await Job.findById(jobId);
      if (!job) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const newBookmark = await Bookmark.create({
        user_id,
        job_id: jobId
      });

      return successResponse(res, 201, 'Lowongan berhasil disimpan di bookmark', { bookmark: newBookmark });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const bookmark = await Bookmark.findById(id);
      if (!bookmark) {
        const error = new Error('Bookmark tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Detail bookmark berhasil diambil', { bookmark });
    } catch (error) {
      next(error);
    }
  },

  async deleteByUserAndJob(req, res, next) {
    try {
      const { jobId } = req.params;
      const user_id = req.user.id;

      const deleted = await Bookmark.deleteByUserAndJob(user_id, jobId);
      if (!deleted) {
        const error = new Error('Bookmark tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      return successResponse(res, 200, 'Bookmark berhasil dihapus');
    } catch (error) {
      next(error);
    }
  },

  async getByUser(req, res, next) {
    try {
      const user_id = req.user.id;
      const bookmarks = await Bookmark.findByUserId(user_id);
      return successResponse(res, 200, 'Daftar bookmark berhasil diambil', { bookmarks });
    } catch (error) {
      next(error);
    }
  }
};
