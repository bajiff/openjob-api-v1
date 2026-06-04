// src/models/Job.js
import { query } from '../config/database.js';
import { generateId } from '../utils/generateId.js';

export const Job = {
  async create({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible = true,
    status = 'open'
  }) {
    const id = generateId();
    const result = await query(
      `INSERT INTO jobs (
        id, company_id, category_id, title, description, job_type, 
        experience_level, location_type, location_city, salary_min, 
        salary_max, is_salary_visible, status
      ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
       RETURNING *`,
      [
        id, company_id, category_id, title, description, job_type,
        experience_level, location_type, location_city, salary_min,
        salary_max, is_salary_visible, status
      ]
    );
    return result.rows[0];
  },

  async findAll({ title, companyName } = {}) {
    let sql = `
      SELECT j.*, 
             c.name AS company_name, c.location AS company_location,
             cat.name AS category_name
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      JOIN categories cat ON j.category_id = cat.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (title) {
      sql += ` AND j.title ILIKE $${paramIndex}`;
      params.push(`%${title}%`);
      paramIndex++;
    }

    if (companyName) {
      sql += ` AND c.name ILIKE $${paramIndex}`;
      params.push(`%${companyName}%`);
      paramIndex++;
    }

    sql += ' ORDER BY j.created_at DESC';

    const result = await query(sql, params);
    return result.rows;
  },

  async findById(id) {
    const result = await query(
      `SELECT j.*, 
              c.name AS company_name, c.location AS company_location, c.description AS company_description,
              cat.name AS category_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       JOIN categories cat ON j.category_id = cat.id
       WHERE j.id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async findByCompanyId(companyId) {
    const result = await query(
      `SELECT j.*, 
              c.name AS company_name, c.location AS company_location,
              cat.name AS category_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       JOIN categories cat ON j.category_id = cat.id
       WHERE j.company_id = $1
       ORDER BY j.created_at DESC`,
      [companyId]
    );
    return result.rows[0] ? result.rows : [];
  },

  async findByCategoryId(categoryId) {
    const result = await query(
      `SELECT j.*, 
              c.name AS company_name, c.location AS company_location,
              cat.name AS category_name
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       JOIN categories cat ON j.category_id = cat.id
       WHERE j.category_id = $1
       ORDER BY j.created_at DESC`,
      [categoryId]
    );
    return result.rows[0] ? result.rows : [];
  },

  async update(id, {
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status
  }) {
    const result = await query(
      `UPDATE jobs 
       SET company_id = $1, category_id = $2, title = $3, description = $4, 
           job_type = $5, experience_level = $6, location_type = $7, 
           location_city = $8, salary_min = $9, salary_max = $10, 
           is_salary_visible = $11, status = $12, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $13 
       RETURNING *`,
      [
        company_id, category_id, title, description, job_type,
        experience_level, location_type, location_city, salary_min,
        salary_max, is_salary_visible, status, id
      ]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await query(
      'DELETE FROM jobs WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
};
