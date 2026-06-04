// src/validators/categoryValidator.js
import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Nama kategori tidak boleh kosong',
    'string.min': 'Nama kategori minimal 3 karakter',
    'any.required': 'Nama kategori wajib diisi'
  })
});
