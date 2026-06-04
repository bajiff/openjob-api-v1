// src/models/Company.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Company = {
  async create({ name, location, description }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO companies (id, name, location, description) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, name, location, description, created_at, updated_at`,
      [id, name, location, description]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await query(
      'SELECT id, name, location, description, created_at, updated_at FROM companies ORDER BY name ASC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      'SELECT id, name, location, description, created_at, updated_at FROM companies WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async update(id, { name, location, description }) {
    const result = await query(
      `UPDATE companies 
       SET name = $1, location = $2, description = $3, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $4 
       RETURNING id, name, location, description, created_at, updated_at`,
      [name, location, description, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM companies WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};
