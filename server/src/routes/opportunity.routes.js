const router = require('express').Router();
const oppController = require('../controllers/opportunity.controller');
const { authMiddleware, optionalAuth } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createOpportunitySchema } = require('../validators/opportunity.validator');

// Public routes (with optional auth for match scores)
router.get('/', optionalAuth, oppController.getOpportunities);
router.get('/trending', oppController.getTrending);
router.get('/recommended', authMiddleware, roleMiddleware('MAHASISWA'), oppController.getRecommendedOpportunities);
router.get('/company', authMiddleware, roleMiddleware('INDUSTRI'), oppController.getCompanyListings);
router.get('/:id', optionalAuth, oppController.getOpportunityById);

// Industri routes
router.post('/', authMiddleware, roleMiddleware('INDUSTRI'), validate(createOpportunitySchema), oppController.createOpportunity);
router.put('/:id', authMiddleware, roleMiddleware('INDUSTRI'), oppController.updateOpportunity);
router.delete('/:id', authMiddleware, roleMiddleware('INDUSTRI'), oppController.deleteOpportunity);

module.exports = router;
