const router = require('express').Router();
const portfolioController = require('../controllers/portfolio.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { createPortfolioSchema } = require('../validators/portfolio.validator');

router.get('/', authMiddleware, roleMiddleware('MAHASISWA'), portfolioController.getPortfolio);
router.post('/', authMiddleware, roleMiddleware('MAHASISWA'), validate(createPortfolioSchema), portfolioController.createEntry);
router.put('/:id', authMiddleware, roleMiddleware('MAHASISWA'), portfolioController.updateEntry);
router.delete('/:id', authMiddleware, roleMiddleware('MAHASISWA'), portfolioController.deleteEntry);

module.exports = router;
