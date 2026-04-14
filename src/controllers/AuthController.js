// src/controllers/AuthController.js
import { AuthService } from '../services/AuthService.js';
import { successResponse } from '../utils/response.js';

export const AuthController = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      successResponse(res, 200, 'Login berhasil', result);
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokens = await AuthService.refreshToken(refreshToken);
      successResponse(res, 200, 'Token berhasil diperbarui', tokens);
    } catch (error) {
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await AuthService.logout(refreshToken);
      successResponse(res, 200, 'Logout berhasil');
    } catch (error) {
      next(error);
    }
  }
};