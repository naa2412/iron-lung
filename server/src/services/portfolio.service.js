const prisma = require('../utils/prisma');

async function getPortfolio(userId) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) return [];

  return prisma.portfolioEntry.findMany({
    where: { studentId: profile.id },
    orderBy: { date: 'desc' },
  });
}

async function createEntry(userId, data) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw Object.assign(new Error('Profil mahasiswa tidak ditemukan'), { statusCode: 404 });
  }

  const entry = await prisma.portfolioEntry.create({
    data: {
      studentId: profile.id,
      type: data.type,
      title: data.title,
      description: data.description || null,
      date: data.date ? new Date(data.date) : null,
      organization: data.organization || null,
      docUrl: data.docUrl || null,
      skills: data.skills || [],
    },
  });

  // Check "Portofolio Lengkap" badge
  await checkPortfolioBadge(profile.id);

  return entry;
}

async function updateEntry(userId, entryId, data) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  const entry = await prisma.portfolioEntry.findUnique({ where: { id: entryId } });

  if (!entry || entry.studentId !== profile.id) {
    throw Object.assign(new Error('Entri portofolio tidak ditemukan'), { statusCode: 404 });
  }

  return prisma.portfolioEntry.update({
    where: { id: entryId },
    data: {
      type: data.type,
      title: data.title,
      description: data.description,
      date: data.date ? new Date(data.date) : undefined,
      organization: data.organization,
      docUrl: data.docUrl,
      skills: data.skills,
    },
  });
}

async function deleteEntry(userId, entryId) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  const entry = await prisma.portfolioEntry.findUnique({ where: { id: entryId } });

  if (!entry || entry.studentId !== profile.id) {
    throw Object.assign(new Error('Entri portofolio tidak ditemukan'), { statusCode: 404 });
  }

  await prisma.portfolioEntry.delete({ where: { id: entryId } });
  return { message: 'Entri portofolio berhasil dihapus' };
}

async function checkPortfolioBadge(studentId) {
  const types = ['INTERNSHIP', 'PROJECT', 'COMPETITION', 'CERTIFICATION', 'TRAINING'];
  const entryCounts = await Promise.all(
    types.map((type) =>
      prisma.portfolioEntry.count({ where: { studentId, type } })
    )
  );

  const allFilled = entryCounts.every((count) => count > 0);
  if (allFilled) {
    await prisma.badge.upsert({
      where: { studentId_badgeType: { studentId, badgeType: 'PORTOFOLIO_LENGKAP' } },
      create: { studentId, badgeType: 'PORTOFOLIO_LENGKAP' },
      update: {},
    });
  }
}

module.exports = {
  getPortfolio,
  createEntry,
  updateEntry,
  deleteEntry,
};
