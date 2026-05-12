// src/middleware/errorHandler.js
import { errorResponse } from '../utils/response.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error('🔥 ERROR:', err.stack || err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Joi Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.details.map(detail => detail.message).join(', ');
  }

  // Handle PostgreSQL Unique Violation (Email sudah dipakai)
  if (err.code === '23505') {
    statusCode = 400;
    message = 'Email sudah terdaftar';
  }

  // Handle PostgreSQL Foreign Key Violation
  if (err.code === '23503') {
    statusCode = 400;
    message = 'Data yang direferensikan tidak ditemukan';
  }

  errorResponse(res, statusCode, message);
};

// Middleware untuk handle 404 Not Found
export const notFound = (req, res, next) => {
  errorResponse(res, 404, `Route ${req.originalUrl} tidak ditemukan`);
};