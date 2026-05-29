const prisma = require('../utils/prisma');

async function applyToOpportunity(userId, opportunityId, data) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) {
    throw Object.assign(new Error('Profil mahasiswa tidak ditemukan'), { statusCode: 404 });
  }

  const opportunity = await prisma.opportunity.findUnique({
    where: { id: opportunityId },
    include: { company: { select: { userId: true } } },
  });

  if (!opportunity || opportunity.status !== 'ACTIVE') {
    throw Object.assign(new Error('Peluang tidak tersedia'), { statusCode: 404 });
  }

  if (new Date(opportunity.deadline) < new Date()) {
    throw Object.assign(new Error('Deadline peluang ini sudah lewat'), { statusCode: 400 });
  }

  const existing = await prisma.application.findUnique({
    where: {
      studentId_opportunityId: {
        studentId: profile.id,
        opportunityId,
      },
    },
  });

  if (existing) {
    throw Object.assign(new Error('Kamu sudah melamar ke peluang ini'), { statusCode: 409 });
  }

  const application = await prisma.application.create({
    data: {
      studentId: profile.id,
      opportunityId,
      coverLetter: data.coverLetter || null,
      portfolioUrl: data.portfolioUrl || null,
    },
  });

  // Create notification for company
  await prisma.notification.create({
    data: {
      userId: opportunity.company.userId,
      type: 'NEW_APPLICANT',
      title: 'Pelamar Baru',
      message: `${profile.name} telah melamar untuk posisi ${opportunity.title}.`,
      relatedId: opportunityId,
    },
  });

  // Check and award badges
  await checkApplicationBadges(profile.id);

  return application;
}

async function getMyApplications(userId) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) return [];

  return prisma.application.findMany({
    where: { studentId: profile.id },
    include: {
      opportunity: {
        include: {
          company: {
            select: { companyName: true, logoUrl: true },
          },
        },
      },
    },
    orderBy: { appliedAt: 'desc' },
  });
}

async function getApplicants(companyUserId, opportunityId) {
  const company = await prisma.companyProfile.findUnique({
    where: { userId: companyUserId },
  });

  const opportunity = await prisma.opportunity.findUnique({
    where: { id: opportunityId },
  });

  if (!opportunity || opportunity.companyId !== company.id) {
    throw Object.assign(new Error('Peluang tidak ditemukan'), { statusCode: 404 });
  }

  return prisma.application.findMany({
    where: { opportunityId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          university: true,
          studyProgram: true,
          semester: true,
          skills: true,
          interests: true,
          avatarUrl: true,
          portfolioUrl: true,
        },
      },
    },
    orderBy: { appliedAt: 'desc' },
  });
}

async function updateApplicationStatus(applicationId, companyUserId, status) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      opportunity: {
        include: { company: true },
      },
      student: {
        select: { userId: true, name: true },
        
      },
    },
  });

  if (!application || application.opportunity.company.userId !== companyUserId) {
    throw Object.assign(new Error('Lamaran tidak ditemukan'), { statusCode: 404 });
  }

  const updated = await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  // Get student user id for notification
  const studentProfile = await prisma.studentProfile.findUnique({
    where: { id: application.studentId },
    select: { userId: true, name: true },
  });

  // Notify student
  const statusMessages = {
    VIEWED: 'telah melihat lamaran kamu',
    ACCEPTED: 'menerima lamaran kamu',
    REJECTED: 'menolak lamaran kamu',
  };

  if (studentProfile && statusMessages[status]) {
    await prisma.notification.create({
      data: {
        userId: studentProfile.userId,
        type: 'APPLICATION_UPDATE',
        title: status === 'ACCEPTED' ? 'Lamaran Diterima' : status === 'REJECTED' ? 'Lamaran Ditolak' : 'Lamaran Dilihat',
        message: `${application.opportunity.company.companyName} ${statusMessages[status]} untuk posisi ${application.opportunity.title}.`,
        relatedId: application.opportunityId,
      },
    });
  }

  return updated;
}

async function trackExternalClick(userId, opportunityId) {
  const profile = await prisma.studentProfile.findUnique({ where: { userId } });
  if (!profile) return;

  // Just record an application with APPLIED status for tracking
  try {
    await prisma.application.create({
      data: {
        studentId: profile.id,
        opportunityId,
        status: 'APPLIED',
      },
    });
  } catch {
    // Already exists, ignore
  }
}

async function checkApplicationBadges(studentId) {
  const appCount = await prisma.application.count({ where: { studentId } });

  // "Pelamar Pertama" badge
  if (appCount === 1) {
    await prisma.badge.upsert({
      where: { studentId_badgeType: { studentId, badgeType: 'PELAMAR_PERTAMA' } },
      create: { studentId, badgeType: 'PELAMAR_PERTAMA' },
      update: {},
    });
  }

  // "Pencari Kerja" — 3 internship applications
  const internshipApps = await prisma.application.count({
    where: {
      studentId,
      opportunity: { category: 'INTERNSHIP' },
    },
  });
  if (internshipApps >= 3) {
    await prisma.badge.upsert({
      where: { studentId_badgeType: { studentId, badgeType: 'PENCARI_KERJA' } },
      create: { studentId, badgeType: 'PENCARI_KERJA' },
      update: {},
    });
  }

  // "Kompetitor" — 1 competition application
  const compApps = await prisma.application.count({
    where: {
      studentId,
      opportunity: { category: 'COMPETITION' },
    },
  });
  if (compApps >= 1) {
    await prisma.badge.upsert({
      where: { studentId_badgeType: { studentId, badgeType: 'KOMPETITOR' } },
      create: { studentId, badgeType: 'KOMPETITOR' },
      update: {},
    });
  }

  // "Kolaborator" — 1 collaboration application
  const collabApps = await prisma.application.count({
    where: {
      studentId,
      opportunity: { category: 'COLLABORATION' },
    },
  });
  if (collabApps >= 1) {
    await prisma.badge.upsert({
      where: { studentId_badgeType: { studentId, badgeType: 'KOLABORATOR' } },
      create: { studentId, badgeType: 'KOLABORATOR' },
      update: {},
    });
  }
}

module.exports = {
  applyToOpportunity,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  trackExternalClick,
};
