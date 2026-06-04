// src/models/Bookmark.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Bookmark = {
  async create({ user_id, job_id }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO bookmarks (id, user_id, job_id) 
       VALUES ($1, $2, $3) 
       RETURNING id, user_id, job_id, created_at`,
      [id, user_id, job_id]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await query(
      `SELECT b.*, 
              j.title AS job_title, c.name AS company_name
       FROM bookmarks b
       JOIN jobs j ON b.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE b.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByUserAndJob(userId, jobId) {
    const result = await query(
      'SELECT id, user_id, job_id, created_at FROM bookmarks WHERE user_id = $1 AND job_id = $2',
      [userId, jobId]
    );
    return result.rows[0];
  },

  async findByUserId(userId) {
    const result = await query(
      `SELECT b.*, 
              j.title AS job_title, c.name AS company_name, c.location AS company_location
       FROM bookmarks b
       JOIN jobs j ON b.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE b.user_id = $1
       ORDER BY b.created_at DESC`,
      [userId]
    );
    return result.rows[0] ? result.rows : [];
  },

  async deleteByUserAndJob(userId, jobId) {
    const result = await query(
      'DELETE FROM bookmarks WHERE user_id = $1 AND job_id = $2 RETURNING id',
      [userId, jobId]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM bookmarks WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};
