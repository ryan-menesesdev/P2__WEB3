const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class AuthService {
  async register(userData) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const roleId = await UserRepository.findRoleByName(userData.role || 'CUSTOMER');
    if (!roleId) {
      throw new Error('Role inválida');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const userId = await UserRepository.create({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      role_id: roleId
    });

    const user = await UserRepository.findById(userId);
    return user;
  }

  async login(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, user: user.toJSON() };
  }
}

module.exports = new AuthService();