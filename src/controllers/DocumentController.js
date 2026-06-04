// src/controllers/DocumentController.js
import { Document } from '../models/Document.js';
import { successResponse } from '../utils/response.js';
import fs from 'fs';
import path from 'path';

export const DocumentController = {
  async upload(req, res, next) {
    try {
      if (!req.file) {
        const error = new Error('File dokumen wajib diunggah');
        error.statusCode = 400;
        throw error;
      }

      const user_id = req.user.id;
      const { filename, originalname, mimetype, size, path: filePath } = req.file;

      const newDocument = await Document.create({
        user_id,
        filename,
        original_name: originalname,
        mime_type: mimetype,
        size,
        path: filePath
      });

      return successResponse(res, 201, 'Dokumen berhasil diunggah', { document: newDocument });
    } catch (error) {
      // Hapus file jika terjadi error setelah multer memproses file
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const documents = await Document.findAll();
      return successResponse(res, 200, 'Daftar dokumen berhasil diambil', { documents });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const document = await Document.findById(id);
      if (!document) {
        const error = new Error('Dokumen tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }
      return successResponse(res, 200, 'Detail dokumen berhasil diambil', { document });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const existingDocument = await Document.findById(id);
      if (!existingDocument) {
        const error = new Error('Dokumen tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      // Hapus dari database
      const deletedDoc = await Document.delete(id);
      
      // Hapus file fisik dari disk jika ada
      if (deletedDoc && deletedDoc.path && fs.existsSync(deletedDoc.path)) {
        fs.unlinkSync(deletedDoc.path);
      }

      return successResponse(res, 200, 'Dokumen berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};
