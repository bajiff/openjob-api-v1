// src/controllers/CompanyController.js
import { Company } from '../models/Company.js';
import { successResponse } from '../utils/response.js';

export const CompanyController = {
  async create(req, res, next) {
    try {
      const newCompany = await Company.create(req.body);
      return successResponse(res, 201, 'Perusahaan berhasil ditambahkan', newCompany);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const companies = await Company.findAll();
      return successResponse(res, 200, 'Daftar perusahaan berhasil diambil', { companies });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const company = await Company.findById(id);
      if (!company) {
        const error = new Error('Perusahaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Detail perusahaan berhasil diambil', { company });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      
      // Cek apakah perusahaan ada
      const existingCompany = await Company.findById(id);
      if (!existingCompany) {
        const error = new Error('Perusahaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      const updatedCompany = await Company.update(id, req.body);
      return successResponse(res, 200, 'Perusahaan berhasil diperbarui', { company: updatedCompany });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // Cek apakah perusahaan ada
      const existingCompany = await Company.findById(id);
      if (!existingCompany) {
        const error = new Error('Perusahaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      await Company.delete(id);
      return successResponse(res, 200, 'Perusahaan berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};
