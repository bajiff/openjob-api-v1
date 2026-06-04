// src/controllers/JobController.js
import { Job } from '../models/Job.js';
import { Company } from '../models/Company.js';
import { Category } from '../models/Category.js';
import { successResponse } from '../utils/response.js';

export const JobController = {
  async create(req, res, next) {
    try {
      const { company_id, category_id } = req.body;

      // Cek apakah company dan category valid
      const company = await Company.findById(company_id);
      if (!company) {
        const error = new Error('Perusahaan tidak ditemukan');
        error.statusCode = 400; // Bad request karena referensi invalid
        throw error;
      }

      const category = await Category.findById(category_id);
      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const newJob = await Job.create(req.body);
      return successResponse(res, 201, 'Lowongan pekerjaan berhasil ditambahkan', { job: newJob });
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const title = req.query.title;
      const companyName = req.query['company-name'];

      const jobs = await Job.findAll({ title, companyName });
      
      // Format jobs agar nested company & category
      const formattedJobs = jobs.map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        job_type: job.job_type,
        experience_level: job.experience_level,
        location_type: job.location_type,
        location_city: job.location_city,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        is_salary_visible: job.is_salary_visible,
        status: job.status,
        created_at: job.created_at,
        updated_at: job.updated_at,
        company: {
          id: job.company_id,
          name: job.company_name,
          location: job.company_location
        },
        category: {
          id: job.category_id,
          name: job.category_name
        }
      }));

      return successResponse(res, 200, 'Daftar lowongan pekerjaan berhasil diambil', { jobs: formattedJobs });
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const job = await Job.findById(id);
      if (!job) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      const formattedJob = {
        id: job.id,
        title: job.title,
        description: job.description,
        job_type: job.job_type,
        experience_level: job.experience_level,
        location_type: job.location_type,
        location_city: job.location_city,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        is_salary_visible: job.is_salary_visible,
        status: job.status,
        created_at: job.created_at,
        updated_at: job.updated_at,
        company: {
          id: job.company_id,
          name: job.company_name,
          location: job.company_location,
          description: job.company_description
        },
        category: {
          id: job.category_id,
          name: job.category_name
        }
      };

      return successResponse(res, 200, 'Detail lowongan pekerjaan berhasil diambil', { job: formattedJob });
    } catch (error) {
      next(error);
    }
  },

  async getByCompanyId(req, res, next) {
    try {
      const { companyId } = req.params;
      const jobs = await Job.findByCompanyId(companyId);
      
      const formattedJobs = jobs.map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        job_type: job.job_type,
        experience_level: job.experience_level,
        location_type: job.location_type,
        location_city: job.location_city,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        is_salary_visible: job.is_salary_visible,
        status: job.status,
        created_at: job.created_at,
        updated_at: job.updated_at,
        company: {
          id: job.company_id,
          name: job.company_name,
          location: job.company_location
        },
        category: {
          id: job.category_id,
          name: job.category_name
        }
      }));

      return successResponse(res, 200, 'Daftar lowongan berdasarkan perusahaan berhasil diambil', { jobs: formattedJobs });
    } catch (error) {
      next(error);
    }
  },

  async getByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const jobs = await Job.findByCategoryId(categoryId);

      const formattedJobs = jobs.map(job => ({
        id: job.id,
        title: job.title,
        description: job.description,
        job_type: job.job_type,
        experience_level: job.experience_level,
        location_type: job.location_type,
        location_city: job.location_city,
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        is_salary_visible: job.is_salary_visible,
        status: job.status,
        created_at: job.created_at,
        updated_at: job.updated_at,
        company: {
          id: job.company_id,
          name: job.company_name,
          location: job.company_location
        },
        category: {
          id: job.category_id,
          name: job.category_name
        }
      }));

      return successResponse(res, 200, 'Daftar lowongan berdasarkan kategori berhasil diambil', { jobs: formattedJobs });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { company_id, category_id } = req.body;

      const existingJob = await Job.findById(id);
      if (!existingJob) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      // Validasi relasi jika diubah
      const company = await Company.findById(company_id);
      if (!company) {
        const error = new Error('Perusahaan tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const category = await Category.findById(category_id);
      if (!category) {
        const error = new Error('Kategori tidak ditemukan');
        error.statusCode = 400;
        throw error;
      }

      const updatedJob = await Job.update(id, req.body);
      return successResponse(res, 200, 'Lowongan pekerjaan berhasil diperbarui', { job: updatedJob });
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const existingJob = await Job.findById(id);
      if (!existingJob) {
        const error = new Error('Lowongan pekerjaan tidak ditemukan');
        error.statusCode = 404;
        throw error;
      }

      await Job.delete(id);
      return successResponse(res, 200, 'Lowongan pekerjaan berhasil dihapus');
    } catch (error) {
      next(error);
    }
  }
};
