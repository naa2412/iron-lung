const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');

const adminGuard = [authMiddleware, roleMiddleware('ADMIN')];

router.get('/stats', ...adminGuard, adminController.getStats);
router.get('/opportunities/pending', ...adminGuard, adminController.getPendingOpportunities);
router.put('/opportunities/:id/approve', ...adminGuard, adminController.approveOpportunity);
router.put('/opportunities/:id/reject', ...adminGuard, adminController.rejectOpportunity);
router.get('/users', ...adminGuard, adminController.getUsers);
router.put('/users/:id/suspend', ...adminGuard, adminController.suspendUser);
router.put('/users/:id/activate', ...adminGuard, adminController.activateUser);
router.get('/analytics/registrations', ...adminGuard, adminController.getRegistrationAnalytics);
router.get('/analytics/categories', ...adminGuard, adminController.getCategoryAnalytics);
router.get('/analytics/roles', ...adminGuard, adminController.getRoleAnalytics);

module.exports = router;
