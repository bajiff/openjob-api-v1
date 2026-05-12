// src/services/AuthService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Auth } from '../models/Auth.js';

export const AuthService = {
  // LOGIN
  async login(email, password) {
    // 1. Cari user berdasarkan email
    const user = await User.findByEmail(email);
    if (!user) {
      const error = new Error('Email atau password salah');
      error.statusCode = 401;
      throw error;
    }

    // 2. Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Email atau password salah');
      error.statusCode = 401;
      throw error;
    }

    // 3. Generate Access Token (expired 3 jam)
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' } // 3 jam
    );

    // 4. Generate Refresh Token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_KEY
    );

    // 5. Simpan refresh token ke database
    await Auth.addToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  },

  // REFRESH TOKEN (Rotate Token)
  async refreshToken(oldRefreshToken) {
    // 1. Verifikasi signature refresh token
    let payload;
    try {
      payload = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_KEY);
    } catch (err) {
      const error = new Error('Refresh token tidak valid');
      error.statusCode = 400;
      throw error;
    }

    // 2. Cek apakah refresh token ada di database (belum dihapus)
    const storedToken = await Auth.findToken(oldRefreshToken);
    if (!storedToken) {
      const error = new Error('Refresh token tidak ditemukan atau sudah kadaluarsa');
      error.statusCode = 400;
      throw error;
    }

    // 3. Hapus refresh token lama (rotasi)
    await Auth.deleteToken(oldRefreshToken);

    // 4. Ambil data user terbaru (opsional, untuk memastikan user masih ada)
    const user = await User.findById(payload.id);
    if (!user) {
      const error = new Error('User tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // 5. Buat access token baru
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '3h' }
    );

    // 6. Buat refresh token baru
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_KEY
    );

    // 7. Simpan refresh token baru ke database
    await Auth.addToken(newRefreshToken, user.id);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  },

  // LOGOUT
  async logout(refreshToken) {
    // Cek apakah token ada
    const token = await Auth.findToken(refreshToken);
    if (!token) {
      const error = new Error('Refresh token tidak ditemukan');
      error.statusCode = 400;
      throw error;
    }
    // Hapus refresh token dari database
    await Auth.deleteToken(refreshToken);
    return true;
  }
};