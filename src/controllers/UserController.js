const UserService = require('../services/UserService');

class UserController {
  async me(req, res, next) {
    try {
      const user = await UserService.getProfile(req.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { name, role } = req.body;
      const user = await UserService.updateProfile(req.userId, { name, role });

      res.json({
        message: 'Perfil atualizado com sucesso',
        user
      });
    } catch (error) {
      next(error);
    }
  }

  async testCustomer(req, res, next) {
    try {
      res.json({
        message: 'Endpoint protegido acessado com sucesso',
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }

  async testAdmin(req, res, next) {
    try {
      res.json({
        message: 'Endpoint administrativo acessado com sucesso',
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();