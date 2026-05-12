// src/services/UserService.js
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export const UserService = {
  async register(userData) {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      const error = new Error('Email sudah terdaftar');
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Simpan user
    const newUser = await User.create({
      ...userData,
      password: hashedPassword
    });

    // Jangan kirim password ke response
    delete newUser.password;
    return newUser;
  },

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error('User tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
};