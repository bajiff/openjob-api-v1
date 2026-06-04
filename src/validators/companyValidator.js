// src/validators/companyValidator.js
import Joi from 'joi';

export const companySchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama perusahaan tidak boleh kosong',
    'string.min': 'Nama perusahaan minimal 3 karakter',
    'any.required': 'Nama perusahaan wajib diisi'
  }),
  location: Joi.string().max(100).required().messages({
    'string.empty': 'Lokasi tidak boleh kosong',
    'string.max': 'Lokasi maksimal 100 karakter',
    'any.required': 'Lokasi wajib diisi'
  }),
  description: Joi.string().allow('', null)
});
