// src/middleware/auth.js
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  try {
    // Ambil header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'Token tidak ditemukan atau format salah');
    }

    const token = authHeader.split(' ')[1];
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    
    // Simpan payload user ke request object agar bisa digunakan di controller
    req.user = decoded; // { id: '...' }
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 401, 'Token kadaluarsa');
    }
    if (error.name === 'JsonWebTokenError') {
      return errorResponse(res, 401, 'Token tidak valid');
    }
    return errorResponse(res, 401, 'Autentikasi gagal');
  }
};