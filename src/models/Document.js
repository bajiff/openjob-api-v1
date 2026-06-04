// src/models/Document.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Document = {
  async create({ user_id, filename, original_name, mime_type, size, path }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO documents (id, user_id, filename, original_name, mime_type, size, path) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id, user_id, filename, original_name, mime_type, size, path, uploaded_at`,
      [id, user_id, filename, original_name, mime_type, size, path]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await query(
      `SELECT d.*, u.name AS user_name 
       FROM documents d
       JOIN users u ON d.user_id = u.id
       ORDER BY d.uploaded_at DESC`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      `SELECT d.*, u.name AS user_name 
       FROM documents d
       JOIN users u ON d.user_id = u.id
       WHERE d.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM documents WHERE id = $1 RETURNING id, path',
      [id]
    );
    return result.rows[0];
  }
};
