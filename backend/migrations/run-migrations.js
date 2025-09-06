const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Get database path from environment or use default
const dbPath = process.env.DB_PATH || './db.sqlite';
const db = new sqlite3.Database(dbPath);

// Read all migration files
const migrationFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.sql') && file !== 'run-migrations.js')
  .sort();

console.log('Starting database migrations...');
console.log(`Found ${migrationFiles.length} migration(s) to apply.`);

const runMigrations = async () => {
  // Enable foreign keys
  await new Promise((resolve, reject) => {
    db.get('PRAGMA foreign_keys = ON', [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Create migrations table if it doesn't exist
  await new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      [],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });

  // Get already executed migrations
  const executedMigrations = await new Promise((resolve, reject) => {
    db.all('SELECT name FROM migrations ORDER BY name', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows.map(row => row.name));
    });
  });

  // Execute new migrations
  for (const file of migrationFiles) {
    if (!executedMigrations.includes(file)) {
      console.log(`Applying migration: ${file}`);
      
      try {
        const migrationSQL = fs.readFileSync(path.join(__dirname, file), 'utf8');
        
        // Wrap in a transaction
        await new Promise((resolve, reject) => {
          db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            
            // Split SQL by semicolon and execute each statement
            const statements = migrationSQL.split(';').filter(statement => statement.trim() !== '');
            
            const executeStatements = (index) => {
              if (index >= statements.length) {
                // All statements executed successfully
                db.run('COMMIT', (err) => {
                  if (err) {
                    db.run('ROLLBACK');
                    reject(err);
                  } else {
                    // Record the migration
                    db.run(
                      'INSERT INTO migrations (name) VALUES (?1)',
                      [file],
                      (err) => {
                        if (err) reject(err);
                        else resolve();
                      }
                    );
                  }
                });
                return;
              }
              
              const statement = statements[index].trim();
              if (statement) {
                db.run(statement, [], function(err) {
                  if (err) {
                    console.error(`Error executing statement in ${file}:`, statement);
                    db.run('ROLLBACK');
                    reject(err);
                  } else {
                    executeStatements(index + 1);
                  }
                });
              } else {
                executeStatements(index + 1);
              }
            };
            
            executeStatements(0);
          });
        });
        
        console.log(`Successfully applied migration: ${file}`);
      } catch (error) {
        console.error(`Failed to apply migration ${file}:`, error);
        process.exit(1);
      }
    }
  }

  console.log('All migrations completed successfully');
  db.close();
};

runMigrations().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
