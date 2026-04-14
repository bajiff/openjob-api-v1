export const up = (pgm) => {
  pgm.createTable('applications', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    job_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"jobs"',
      onDelete: 'CASCADE',
    },
    status: {
      type: 'VARCHAR(20)', // pending, reviewed, accepted, rejected
      notNull: true,
      default: 'pending',
    },
    cover_letter: {
      type: 'TEXT',
    },
    applied_at: {
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

  // Unique constraint agar user tidak apply job yang sama 2x
  pgm.addConstraint('applications', 'unique_user_job', {
    unique: ['user_id', 'job_id'],
  });

  pgm.createIndex('applications', 'user_id');
  pgm.createIndex('applications', 'job_id');
  pgm.createIndex('applications', 'status');
};

export const down = (pgm) => {
  pgm.dropTable('applications');
};