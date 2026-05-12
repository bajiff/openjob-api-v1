// src/models/User.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const User = {
  async create({ name, email, password, role = 'user' }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO users (id, name, email, password, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, role, created_at, updated_at`,
      [id, name, email, password, role]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await query(
      'SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
};