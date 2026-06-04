// src/models/Category.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Category = {
  async create({ name }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO categories (id, name) 
       VALUES ($1, $2) 
       RETURNING id, name, created_at, updated_at`,
      [id, name]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await query(
      'SELECT id, name, created_at, updated_at FROM categories ORDER BY name ASC'
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      'SELECT id, name, created_at, updated_at FROM categories WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async findByName(name) {
    const result = await query(
      'SELECT id, name, created_at, updated_at FROM categories WHERE name = $1',
      [name]
    );
    return result.rows[0];
  },

  async update(id, { name }) {
    const result = await query(
      `UPDATE categories 
       SET name = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING id, name, created_at, updated_at`,
      [name, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM categories WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};
