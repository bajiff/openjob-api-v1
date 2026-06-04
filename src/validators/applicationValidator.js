// src/validators/applicationValidator.js
import Joi from 'joi';

export const applySchema = Joi.object({
  job_id: Joi.string().required().messages({
    'string.empty': 'Job ID tidak boleh kosong',
    'any.required': 'Job ID wajib diisi'
  }),
  cover_letter: Joi.string().allow('', null)
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'reviewed', 'accepted', 'rejected').required().messages({
    'any.only': 'Status harus salah satu dari: pending, reviewed, accepted, rejected',
    'any.required': 'Status wajib diisi'
  })
});
