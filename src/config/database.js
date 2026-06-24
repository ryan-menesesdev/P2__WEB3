const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

let db;

async function initDatabase() {
  db = await open({
    filename: path.join(__dirname, '../../database/prova.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    );
  `);

  await db.run(`
    INSERT OR IGNORE INTO roles (name) VALUES ('CUSTOMER'), ('ADMINISTRATOR');
  `);

  const bcrypt = require('bcryptjs');
  const adminPassword = await bcrypt.hash('admin123', 10);

  await db.run(`
    INSERT OR IGNORE INTO users (name, email, password, role_id)
    SELECT 'Admin', 'admin@prova.com', ?, id FROM roles WHERE name = 'ADMINISTRATOR'
  `, [adminPassword]);

  console.log('Banco de dados inicializado com sucesso');
  return db;
}

function getDb() {
  return db;
}

module.exports = { initDatabase, getDb };