const router = require('express').Router();
const appController = require('../controllers/application.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware('MAHASISWA'), appController.apply);
router.get('/my', authMiddleware, roleMiddleware('MAHASISWA'), appController.getMyApplications);
router.get('/opportunity/:opportunityId', authMiddleware, roleMiddleware('INDUSTRI'), appController.getApplicants);
router.put('/:id/status', authMiddleware, roleMiddleware('INDUSTRI'), appController.updateStatus);
router.post('/track-click/:id', authMiddleware, roleMiddleware('MAHASISWA'), appController.trackClick);

module.exports = router;
