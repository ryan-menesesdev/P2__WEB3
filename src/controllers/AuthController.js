const AuthService = require('../services/AuthService');

class AuthController {
  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Campos obrigatórios: name, email, password' });
      }

      const user = await AuthService.register({ name, email, password, role });

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Campos obrigatórios: email, password' });
      }

      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();