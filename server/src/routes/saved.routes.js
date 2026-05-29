const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');

// Save opportunity
router.post('/:opportunityId', authMiddleware, roleMiddleware('MAHASISWA'), async (req, res, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ error: 'Profil tidak ditemukan' });

    const saved = await prisma.savedOpportunity.create({
      data: {
        studentId: profile.id,
        opportunityId: req.params.opportunityId,
      },
    });

    // Check "Kolektor" badge (5 saves)
    const saveCount = await prisma.savedOpportunity.count({ where: { studentId: profile.id } });
    if (saveCount >= 5) {
      await prisma.badge.upsert({
        where: { studentId_badgeType: { studentId: profile.id, badgeType: 'KOLEKTOR' } },
        create: { studentId: profile.id, badgeType: 'KOLEKTOR' },
        update: {},
      });
    }

    res.status(201).json(saved);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Peluang sudah disimpan' });
    }
    next(error);
  }
});

// Unsave opportunity
router.delete('/:opportunityId', authMiddleware, roleMiddleware('MAHASISWA'), async (req, res, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
    if (!profile) return res.status(404).json({ error: 'Profil tidak ditemukan' });

    await prisma.savedOpportunity.delete({
      where: {
        studentId_opportunityId: {
          studentId: profile.id,
          opportunityId: req.params.opportunityId,
        },
      },
    });
    res.json({ message: 'Peluang berhasil dihapus dari simpanan' });
  } catch (error) {
    next(error);
  }
});

// Get all saved
router.get('/', authMiddleware, roleMiddleware('MAHASISWA'), async (req, res, next) => {
  try {
    const profile = await prisma.studentProfile.findUnique({ where: { userId: req.user.id } });
    if (!profile) return res.json([]);

    const saved = await prisma.savedOpportunity.findMany({
      where: { studentId: profile.id },
      include: {
        opportunity: {
          include: {
            company: {
              select: { companyName: true, logoUrl: true },
            },
            _count: {
              select: { savedBy: true },
            },
          },
        },
      },
      orderBy: { savedAt: 'desc' },
    });

    res.json(saved.map((s) => ({ ...s.opportunity, savedAt: s.savedAt })));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
