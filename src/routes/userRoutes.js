const express = require('express');
const UserController = require('../controllers/UserController');
const { authMiddleware, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/me', UserController.me);
router.put('/profile', UserController.updateProfile);
router.get('/test/customer', authorizeRoles('CUSTOMER', 'ADMINISTRATOR'), UserController.testCustomer);
router.get('/test/admin', authorizeRoles('ADMINISTRATOR'), UserController.testAdmin);

module.exports = router;