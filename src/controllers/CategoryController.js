// src/controllers/CategoryController.js
import { Category } from '../models/Category.js';
import { successResponse } from '../utils/response.js';

export const CategoryController = {
  async create(req, res, next) {
    try {
      const newCategory = await Category.create(req.body);
      return successResponse(res, 201, 'Kategori berhasil ditambahkan', newCategory);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      return successResponse(res, 200, 'Daftar kategori berhasil diambil', { categories });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Detail kategori berhasil diambil', { category });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      
      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        const error = new Error('Kategori tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      const updatedCategory = await Category.update(id, req.body);
      return successResponse(res, 200, 'Kategori berhasil diperbarui', { category: updatedCategory });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const existingCategory = await Category.findById(id);
      if (!existingCategory) {
        const error = new Error('Kategori tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      await Category.delete(id);
      return successResponse(res, 200, 'Kategori berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};
