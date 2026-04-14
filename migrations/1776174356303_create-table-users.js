// migrations/..._create-table-users.js
export const up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true, // UNIQUE CONSTRAINT WAJIB UNTUK SKILLED TIER
    },
    password: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    role: {
      type: 'VARCHAR(20)',
      notNull: true,
      default: 'user',
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

  // Index untuk pencarian cepat berdasarkan email
  pgm.createIndex('users', 'email');
};

export const down = (pgm) => {
  pgm.dropTable('users');
};