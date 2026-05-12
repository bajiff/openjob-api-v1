// src/controllers/UserController.js
import { UserService } from '../services/UserServices.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const UserController = {
  async register(req, res, next) {
    try {
      const newUser = await UserService.register(req.body);
      successResponse(res, 201, 'Registrasi berhasil', newUser);
    } catch (error) {
      next(error); // Lempar ke error handler middleware
    }
  },

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      successResponse(res, 200, 'User ditemukan', user);
    } catch (error) {
      next(error);
    }
  }
};