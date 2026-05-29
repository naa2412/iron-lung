const prisma = require('../utils/prisma');
const { paginate, buildPaginationMeta } = require('../utils/helpers');
const { calculateMatchScore } = require('./recommendation.service');

async function getOpportunities(query, userId = null) {
  const { page, limit, skip, take } = paginate(query.page, query.limit);

  const where = {
    status: 'ACTIVE',
    deadline: { gte: new Date() },
  };

  if (query.category) where.category = query.category;
  if (query.locationType) where.locationType = query.locationType;
  if (query.search) {
    where.OR = [
      { title: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
    ];
  }
  if (query.skills && query.skills.length > 0) {
    where.skillsRequired = { hasSome: query.skills };
  }

  const orderBy = {};
  if (query.sort === 'deadline') {
    orderBy.deadline = 'asc';
  } else {
    orderBy.createdAt = 'desc';
  }

  const [opportunities, total] = await Promise.all([
    prisma.opportunity.findMany({
      where,
      include: {
        company: {
          select: { companyName: true, logoUrl: true },
        },
        _count: {
          select: { savedBy: true, applications: true },
        },
      },
      orderBy,
      skip,
      take,
    }),
    prisma.opportunity.count({ where }),
  ]);

  // Calculate match scores if user is authenticated
  let results = opportunities;
  if (userId) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { interests: true, skills: true },
    });

    if (profile) {
      results = opportunities.map((opp) => ({
        ...opp,
        matchScore: calculateMatchScore(profile.interests, profile.skills, opp).score,
      }));
    }
  }

  return {
    data: results,
    pagination: buildPaginationMeta(total, page, limit),
  };
}

async function getOpportunityById(id, userId = null) {
  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: {
      company: {
        select: {
          id: true,
          companyName: true,
          logoUrl: true,
          description: true,
          website: true,
          contactEmail: true,
        },
      },
      _count: {
        select: { savedBy: true, applications: true },
      },
    },
  });

  if (!opportunity) {
    throw Object.assign(new Error('Peluang tidak ditemukan'), { statusCode: 404 });
  }

  let matchScore = null;
  let isSaved = false;
  let hasApplied = false;

  if (userId) {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { id: true, interests: true, skills: true },
    });

    if (profile) {
      matchScore = calculateMatchScore(profile.interests, profile.skills, opportunity);

      const saved = await prisma.savedOpportunity.findUnique({
        where: {
          studentId_opportunityId: {
            studentId: profile.id,
            opportunityId: id,
          },
        },
      });
      isSaved = !!saved;

      const application = await prisma.application.findUnique({
        where: {
          studentId_opportunityId: {
            studentId: profile.id,
            opportunityId: id,
          },
        },
      });
      hasApplied = !!application;
    }
  }

  return { ...opportunity, matchScore, isSaved, hasApplied };
}

async function createOpportunity(companyUserId, data) {
  const company = await prisma.companyProfile.findUnique({
    where: { userId: companyUserId },
  });

  if (!company) {
    throw Object.assign(new Error('Profil perusahaan tidak ditemukan'), { statusCode: 404 });
  }

  return prisma.opportunity.create({
    data: {
      companyId: company.id,
      title: data.title,
      category: data.category,
      description: data.description,
      requirements: data.requirements,
      locationType: data.locationType,
      city: data.city || null,
      duration: data.duration || null,
      deadline: new Date(data.deadline),
      skillsRequired: data.skillsRequired,
      registrationUrl: data.registrationUrl || null,
      status: 'PENDING',
    },
    include: {
      company: {
        select: { companyName: true, logoUrl: true },
      },
    },
  });
}

async function updateOpportunity(id, companyUserId, data) {
  const company = await prisma.companyProfile.findUnique({
    where: { userId: companyUserId },
  });

  const opportunity = await prisma.opportunity.findUnique({ where: { id } });
  if (!opportunity || opportunity.companyId !== company.id) {
    throw Object.assign(new Error('Peluang tidak ditemukan atau bukan milik Anda'), { statusCode: 404 });
  }

  return prisma.opportunity.update({
    where: { id },
    data: {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    },
    include: {
      company: { select: { companyName: true, logoUrl: true } },
    },
  });
}

async function deleteOpportunity(id, companyUserId) {
  const company = await prisma.companyProfile.findUnique({
    where: { userId: companyUserId },
  });

  const opportunity = await prisma.opportunity.findUnique({ where: { id } });
  if (!opportunity || opportunity.companyId !== company.id) {
    throw Object.assign(new Error('Peluang tidak ditemukan atau bukan milik Anda'), { statusCode: 404 });
  }

  await prisma.opportunity.delete({ where: { id } });
  return { message: 'Peluang berhasil dihapus' };
}

async function getTrending(limit = 6) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: 'ACTIVE',
      deadline: { gte: new Date() },
    },
    include: {
      company: {
        select: { companyName: true, logoUrl: true },
      },
      _count: {
        select: { savedBy: true },
      },
    },
  });

  // Sort by saved count descending
  opportunities.sort((a, b) => b._count.savedBy - a._count.savedBy);
  return opportunities.slice(0, limit);
}

async function getCompanyListings(companyUserId) {
  const company = await prisma.companyProfile.findUnique({
    where: { userId: companyUserId },
  });

  if (!company) return [];

  return prisma.opportunity.findMany({
    where: { companyId: company.id },
    include: {
      _count: {
        select: { applications: true, savedBy: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getTrending,
  getCompanyListings,
};
