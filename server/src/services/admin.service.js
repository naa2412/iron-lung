const prisma = require('../utils/prisma');
const { paginate, buildPaginationMeta } = require('../utils/helpers');

async function getStats() {
  const [totalUsers, totalCompanies, activeOpportunities, todayApplications] = await Promise.all([
    prisma.user.count({ where: { role: 'MAHASISWA' } }),
    prisma.user.count({ where: { role: 'INDUSTRI' } }),
    prisma.opportunity.count({ where: { status: 'ACTIVE' } }),
    prisma.application.count({
      where: {
        appliedAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);

  return { totalUsers, totalCompanies, activeOpportunities, todayApplications };
}

async function getPendingOpportunities() {
  return prisma.opportunity.findMany({
    where: { status: 'PENDING' },
    include: {
      company: {
        select: { companyName: true, logoUrl: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function approveOpportunity(id) {
  const opp = await prisma.opportunity.update({
    where: { id },
    data: { status: 'ACTIVE' },
    include: { company: true },
  });

  // Notify company
  await prisma.notification.create({
    data: {
      userId: opp.company.userId,
      type: 'OPPORTUNITY_APPROVED',
      title: 'Peluang Disetujui',
      message: `Peluang "${opp.title}" telah disetujui oleh admin dan sekarang aktif.`,
      relatedId: opp.id,
    },
  });

  // Notify matching students
  const students = await prisma.studentProfile.findMany({
    where: {
      interests: { hasSome: opp.skillsRequired },
    },
    select: { userId: true },
  });

  if (students.length > 0) {
    await prisma.notification.createMany({
      data: students.map((s) => ({
        userId: s.userId,
        type: 'NEW_OPPORTUNITY',
        title: 'Peluang Baru yang Cocok',
        message: `Ada peluang baru yang cocok dengan minat kamu: ${opp.title} di ${opp.company.companyName}.`,
        relatedId: opp.id,
      })),
    });
  }

  return opp;
}

async function rejectOpportunity(id, reason) {
  const opp = await prisma.opportunity.update({
    where: { id },
    data: { status: 'REJECTED', rejectionReason: reason },
    include: { company: true },
  });

  await prisma.notification.create({
    data: {
      userId: opp.company.userId,
      type: 'OPPORTUNITY_REJECTED',
      title: 'Peluang Ditolak',
      message: `Peluang "${opp.title}" ditolak oleh admin. Alasan: ${reason}`,
      relatedId: opp.id,
    },
  });

  return opp;
}

async function getUsers(query) {
  const { page, limit, skip, take } = paginate(query.page, query.limit);

  const where = {};
  if (query.role) where.role = query.role;
  if (query.search) {
    where.email = { contains: query.search, mode: 'insensitive' };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        studentProfile: { select: { name: true, university: true } },
        companyProfile: { select: { companyName: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: buildPaginationMeta(total, page, limit),
  };
}

async function suspendUser(id) {
  return prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
}

async function activateUser(id) {
  return prisma.user.update({
    where: { id },
    data: { isActive: true },
  });
}

async function getRegistrationAnalytics() {
  const weeks = [];
  for (let i = 7; i >= 0; i--) {
    const start = new Date();
    start.setDate(start.getDate() - (i + 1) * 7);
    const end = new Date();
    end.setDate(end.getDate() - i * 7);

    const count = await prisma.user.count({
      where: {
        createdAt: { gte: start, lt: end },
        role: { not: 'ADMIN' },
      },
    });

    weeks.push({
      week: `Minggu ${8 - i}`,
      startDate: start.toISOString().split('T')[0],
      count,
    });
  }
  return weeks;
}

async function getCategoryAnalytics() {
  const categories = ['INTERNSHIP', 'COLLABORATION', 'COMPETITION', 'TRAINING'];
  const result = await Promise.all(
    categories.map(async (category) => ({
      category,
      label: {
        INTERNSHIP: 'Magang',
        COLLABORATION: 'Kolaborasi',
        COMPETITION: 'Kompetisi',
        TRAINING: 'Pelatihan',
      }[category],
      count: await prisma.opportunity.count({ where: { category } }),
    }))
  );
  return result;
}

async function getRoleAnalytics() {
  const [mahasiswa, industri, admin] = await Promise.all([
    prisma.user.count({ where: { role: 'MAHASISWA' } }),
    prisma.user.count({ where: { role: 'INDUSTRI' } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
  ]);
  return [
    { role: 'Mahasiswa', count: mahasiswa },
    { role: 'Industri', count: industri },
    { role: 'Admin', count: admin },
  ];
}

module.exports = {
  getStats,
  getPendingOpportunities,
  approveOpportunity,
  rejectOpportunity,
  getUsers,
  suspendUser,
  activateUser,
  getRegistrationAnalytics,
  getCategoryAnalytics,
  getRoleAnalytics,
};
