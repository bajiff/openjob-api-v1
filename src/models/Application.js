// src/models/Application.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Application = {
  async create({ user_id, job_id, cover_letter }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO applications (id, user_id, job_id, cover_letter) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, user_id, job_id, status, cover_letter, applied_at, updated_at`,
      [id, user_id, job_id, cover_letter]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await query(
      `SELECT a.*, 
              u.name AS user_name, u.email AS user_email,
              j.title AS job_title, c.name AS company_name
       FROM applications a
       JOIN users u ON a.user_id = u.id
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       ORDER BY a.applied_at DESC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      `SELECT a.*, 
              u.name AS user_name, u.email AS user_email,
              j.title AS job_title, j.description AS job_description,
              c.name AS company_name, c.location AS company_location
       FROM applications a
       JOIN users u ON a.user_id = u.id
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE a.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByUserId(userId) {
    const result = await query(
      `SELECT a.*, 
              j.title AS job_title, c.name AS company_name, c.location AS company_location
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN companies c ON j.company_id = c.id
       WHERE a.user_id = $1
       ORDER BY a.applied_at DESC`,
      [userId]
    );
    return result.rows[0] ? result.rows : [];
  },

  async findByJobId(jobId) {
    const result = await query(
      `SELECT a.*, 
              u.name AS user_name, u.email AS user_email
       FROM applications a
       JOIN users u ON a.user_id = u.id
       WHERE a.job_id = $1
       ORDER BY a.applied_at DESC`,
      [jobId]
    );
    return result.rows[0] ? result.rows : [];
  },

  async updateStatus(id, status) {
    const result = await query(
      `UPDATE applications 
       SET status = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING id, user_id, job_id, status, cover_letter, applied_at, updated_at`,
      [status, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM applications WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};
