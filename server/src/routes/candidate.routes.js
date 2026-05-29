const router = require('express').Router();
const prisma = require('../utils/prisma');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { roleMiddleware } = require('../middlewares/role.middleware');

router.get('/', authMiddleware, roleMiddleware('INDUSTRI'), async (req, res, next) => {
  try {
    const { skills, interests, university, semester, search } = req.query;

    const where = {};

    if (skills) {
      where.skills = { hasSome: skills.split(',') };
    }
    if (interests) {
      where.interests = { hasSome: interests.split(',') };
    }
    if (university) {
      where.university = { contains: university, mode: 'insensitive' };
    }
    if (semester) {
      where.semester = parseInt(semester);
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { university: { contains: search, mode: 'insensitive' } },
      ];
    }

    const candidates = await prisma.studentProfile.findMany({
      where,
      select: {
        id: true,
        name: true,
        university: true,
        studyProgram: true,
        semester: true,
        bio: true,
        skills: true,
        interests: true,
        avatarUrl: true,
        portfolioUrl: true,
        _count: {
          select: { portfolioEntries: true },
        },
      },
      orderBy: { name: 'asc' },
      take: 50,
    });

    res.json(candidates);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
