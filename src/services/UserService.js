const UserRepository = require('../repositories/UserRepository');

class UserService {
  async getProfile(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (updateData.role) {
      const roleId = await UserRepository.findRoleByName(updateData.role);
      if (!roleId) {
        throw new Error('Role inválida');
      }
      updateData.role_id = roleId;
    }

    const updated = await UserRepository.update(userId, updateData);
    if (!updated) {
      throw new Error('Erro ao atualizar perfil');
    }

    return await UserRepository.findById(userId);
  }

  async findAll() {
    const db = require('../config/database').getDb();
    const rows = await db.all(`
      SELECT u.*, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
    `);

    return rows.map(row => {
      const user = new (require('../models/User'))(row);
      user.role = new (require('../models/Role'))({ id: row.role_id, name: row.role_name });
      return user;
    });
  }
}

module.exports = new UserService();