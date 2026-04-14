export const up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    company_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"companies"',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"categories"',
      onDelete: 'CASCADE',
    },
    title: {
      type: 'VARCHAR(200)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
    },
    job_type: {
      type: 'VARCHAR(20)', // full-time, part-time, contract, internship
      notNull: true,
    },
    experience_level: {
      type: 'VARCHAR(20)', // junior, mid, senior, lead
      notNull: true,
    },
    location_type: {
      type: 'VARCHAR(20)', // remote, onsite, hybrid
      notNull: true,
    },
    location_city: {
      type: 'VARCHAR(100)',
    },
    salary_min: {
      type: 'INTEGER',
    },
    salary_max: {
      type: 'INTEGER',
    },
    is_salary_visible: {
      type: 'BOOLEAN',
      notNull: true,
      default: true,
    },
    status: {
      type: 'VARCHAR(20)', // open, closed, draft
      notNull: true,
      default: 'open',
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Index untuk pencarian (WAJIB UNTUK ADVANCED SEARCH FEATURE)
  pgm.createIndex('jobs', 'company_id');
  pgm.createIndex('jobs', 'category_id');
  pgm.createIndex('jobs', 'title'); // Untuk fitur ?title=
  pgm.createIndex('jobs', 'status');
};

export const down = (pgm) => {
  pgm.dropTable('jobs');
};