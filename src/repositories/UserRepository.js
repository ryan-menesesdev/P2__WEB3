const { getDb } = require('../config/database');
const User = require('../models/User');
const Role = require('../models/Role');

class UserRepository {
  async create(userData) {
    const db = getDb();
    const result = await db.run(`
      INSERT INTO users (name, email, password, role_id)
      VALUES (?, ?, ?, ?)
    `, [userData.name, userData.email, userData.password, userData.role_id]);
    return result.lastID;
  }

  async findByEmail(email) {
    const db = getDb();
    const row = await db.get(`
      SELECT u.*, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
    `, [email]);

    if (!row) return null;

    const user = new User(row);
    user.role = new Role({ id: row.role_id, name: row.role_name });
    return user;
  }

  async findById(id) {
    const db = getDb();
    const row = await db.get(`
      SELECT u.*, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ?
    `, [id]);

    if (!row) return null;

    const user = new User(row);
    user.role = new Role({ id: row.role_id, name: row.role_name });
    return user;
  }

  async update(id, updateData) {
    const db = getDb();
    const fields = [];
    const values = [];

    if (updateData.name) {
      fields.push('name = ?');
      values.push(updateData.name);
    }
    if (updateData.role_id) {
      fields.push('role_id = ?');
      values.push(updateData.role_id);
    }

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    const result = await db.run(query, values);
    return result.changes > 0;
  }

  async findRoleByName(name) {
    const db = getDb();
    const row = await db.get('SELECT id FROM roles WHERE name = ?', [name]);
    return row ? row.id : null;
  }
}

module.exports = new UserRepository();