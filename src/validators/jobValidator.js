// src/validators/jobValidator.js
import Joi from 'joi';

export const jobSchema = Joi.object({
  company_id: Joi.string().required().messages({
    'string.empty': 'Company ID tidak boleh kosong',
    'any.required': 'Company ID wajib diisi'
  }),
  category_id: Joi.string().required().messages({
    'string.empty': 'Category ID tidak boleh kosong',
    'any.required': 'Category ID wajib diisi'
  }),
  title: Joi.string().min(3).max(200).required().messages({
    'string.empty': 'Judul lowongan tidak boleh kosong',
    'string.min': 'Judul lowongan minimal 3 karakter',
    'any.required': 'Judul lowongan wajib diisi'
  }),
  description: Joi.string().allow('', null),
  job_type: Joi.string().valid('full-time', 'part-time', 'contract', 'internship').required().messages({
    'any.only': 'Tipe pekerjaan harus salah satu dari: full-time, part-time, contract, internship',
    'any.required': 'Tipe pekerjaan wajib diisi'
  }),
  experience_level: Joi.string().valid('junior', 'mid', 'senior', 'lead').required().messages({
    'any.only': 'Level pengalaman harus salah satu dari: junior, mid, senior, lead',
    'any.required': 'Level pengalaman wajib diisi'
  }),
  location_type: Joi.string().valid('remote', 'onsite', 'hybrid').required().messages({
    'any.only': 'Tipe lokasi harus salah satu dari: remote, onsite, hybrid',
    'any.required': 'Tipe lokasi wajib diisi'
  }),
  location_city: Joi.string().max(100).allow('', null),
  salary_min: Joi.number().integer().min(0).allow(null),
  salary_max: Joi.number().integer().min(Joi.ref('salary_min')).allow(null).messages({
    'number.min': 'Gaji maksimum tidak boleh lebih kecil dari gaji minimum'
  }),
  is_salary_visible: Joi.boolean().default(true),
  status: Joi.string().valid('open', 'closed', 'draft').default('open')
});
