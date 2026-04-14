export const up = (pgm) => {
  pgm.createTable('documents', {
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
    filename: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    original_name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    mime_type: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    size: {
      type: 'INTEGER',
      notNull: true,
    },
    path: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    uploaded_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createIndex('documents', 'user_id');
};

export const down = (pgm) => {
  pgm.dropTable('documents');
};