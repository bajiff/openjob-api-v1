// src/controllers/ApplicationController.js
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { successResponse } from '../utils/response.js';

export const ApplicationController = {
  async apply(req, res, next) {
    try {
      const { job_id, cover_letter } = req.body;
      const user_id = req.user.id;

      // Cek apakah job ada
      const job = await Job.findById(job_id);
      if (!job) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const newApplication = await Application.create({
        user_id,
        job_id,
        cover_letter
      });

      return successResponse(res, 201, 'Lamaran berhasil dikirim', { application: newApplication });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const applications = await Application.findAll();
      return successResponse(res, 200, 'Daftar lamaran berhasil diambil', { applications });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const application = await Application.findById(id);
      if (!application) {
        const error = new Error('Lamaran tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Detail lamaran berhasil diambil', { application });
    } catch (error) {
      next(error);
    }
  },

  async getByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const applications = await Application.findByUserId(userId);
      return successResponse(res, 200, 'Daftar lamaran user berhasil diambil', { applications });
    } catch (error) {
      next(error);
    }
  },

  async getByJobId(req, res, next) {
    try {
      const { jobId } = req.params;

      // Cek apakah job ada
      const job = await Job.findById(jobId);
      if (!job) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const applications = await Application.findByJobId(jobId);
      return successResponse(res, 200, 'Daftar lamaran untuk lowongan berhasil diambil', { applications });
    } catch (error) {
      next(error);
    }
  },

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const existingApplication = await Application.findById(id);
      if (!existingApplication) {
        const error = new Error('Lamaran tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      const updatedApplication = await Application.updateStatus(id, status);
      return successResponse(res, 200, 'Status lamaran berhasil diperbarui', { application: updatedApplication });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const existingApplication = await Application.findById(id);
      if (!existingApplication) {
        const error = new Error('Lamaran tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      await Application.delete(id);
      return successResponse(res, 200, 'Lamaran berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};
