const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');
const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'avatar') {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Hanya file gambar yang diperbolehkan'));
      }
    }
    if (file.fieldname === 'cv') {
      if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Hanya file PDF yang diperbolehkan'));
      }
    }
    cb(null, true);
  },
});

router.get('/me', authMiddleware, userController.getMe);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/onboarding', authMiddleware, roleMiddleware('MAHASISWA'), userController.saveOnboarding);
router.post('/avatar', authMiddleware, upload.single('avatar'), userController.uploadAvatar);
router.post('/cv', authMiddleware, roleMiddleware('MAHASISWA'), upload.single('cv'), userController.uploadCv);

// Public profile — no auth required
router.get('/profile/:profileId', userController.getPublicProfile);

module.exports = router;
