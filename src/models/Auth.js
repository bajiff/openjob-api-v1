// src/models/Auth.js
import { query } from '../config/database.js';

export const Auth = {
  // Simpan refresh token ke database
  async addToken(token, userId) {
    const result = await query(
      `INSERT INTO authentications (token, user_id) 
       VALUES ($1, $2) 
       RETURNING token, user_id, created_at`,
      [token, userId]
    );
    return result.rows[0];
  },

  // Cek apakah refresh token ada di database
  async findToken(token) {
    const result = await query(
      'SELECT * FROM authentications WHERE token = $1',
      [token]
    );
    return result.rows[0];
  },

  // Hapus refresh token (saat logout atau refresh rotation)
  async deleteToken(token) {
    const result = await query(
      'DELETE FROM authentications WHERE token = $1 RETURNING token',
      [token]
    );
    return result.rows[0];
  },

  // Opsional: Hapus semua token milik user tertentu (saat ganti password)
  async deleteTokensByUserId(userId) {
    await query('DELETE FROM authentications WHERE user_id = $1', [userId]);
  }
};