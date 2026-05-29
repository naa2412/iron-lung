const prisma = require('../utils/prisma');

async function getCurrentUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      studentProfile: {
        include: {
          badges: true,
          _count: {
            select: {
              applications: true,
              savedOpportunities: true,
              portfolioEntries: true,
            },
          },
        },
      },
      companyProfile: {
        include: {
          _count: {
            select: {
              opportunities: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw Object.assign(new Error('Pengguna tidak ditemukan'), { statusCode: 404 });
  }

  const { passwordHash, ...userData } = user;
  return userData;
}

async function updateStudentProfile(userId, data) {
  const profile = await prisma.studentProfile.update({
    where: { userId },
    data: {
      name: data.name,
      university: data.university,
      studyProgram: data.studyProgram,
      semester: data.semester,
      bio: data.bio,
      skills: data.skills,
      interests: data.interests,
      portfolioUrl: data.portfolioUrl,
    },
  });
  return profile;
}

async function updateCompanyProfile(userId, data) {
  const profile = await prisma.companyProfile.update({
    where: { userId },
    data: {
      companyName: data.companyName,
      description: data.description,
      website: data.website,
      contactEmail: data.contactEmail,
      logoUrl: data.logoUrl,
    },
  });
  return profile;
}

async function saveOnboarding(userId, interests) {
  const profile = await prisma.studentProfile.update({
    where: { userId },
    data: {
      interests,
      onboardingComplete: true,
    },
  });
  return profile;
}

async function updateAvatar(userId, avatarUrl) {
  // Find which profile exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user.role === 'MAHASISWA') {
    return prisma.studentProfile.update({
      where: { userId },
      data: { avatarUrl },
    });
  } else if (user.role === 'INDUSTRI') {
    return prisma.companyProfile.update({
      where: { userId },
      data: { logoUrl: avatarUrl },
    });
  }
}

async function updateCv(userId, cvUrl) {
  return prisma.studentProfile.update({
    where: { userId },
    data: { cvUrl },
  });
}

async function getPublicProfile(profileId) {
  const profile = await prisma.studentProfile.findFirst({
    where: { id: profileId },
    include: {
      badges: true,
      portfolioEntries: {
        orderBy: { date: 'desc' },
      },
      user: {
        select: { email: true, createdAt: true },
      },
    },
  });

  if (!profile) {
    throw Object.assign(new Error('Profil tidak ditemukan'), { statusCode: 404 });
  }

  return profile;
}

async function getProfileCompletion(userId) {
  const profile = await prisma.studentProfile.findUnique({
    where: { userId },
  });

  if (!profile) return { percentage: 0, items: [] };

  const items = [
    { label: 'Foto profil', done: !!profile.avatarUrl },
    { label: 'Bio', done: !!profile.bio },
    { label: 'Skill (minimal 3)', done: profile.skills.length >= 3 },
    { label: 'Minat diisi', done: profile.interests.length > 0 },
    { label: 'Upload CV', done: !!profile.cvUrl },
  ];

  // Check portfolio
  const portfolioCount = await prisma.portfolioEntry.count({
    where: { studentId: profile.id },
  });
  items.push({ label: 'Tambah 1 portofolio', done: portfolioCount > 0 });

  const completedCount = items.filter((i) => i.done).length;
  const percentage = Math.round((completedCount / items.length) * 100);

  return { percentage, items };
}

module.exports = {
  getCurrentUser,
  updateStudentProfile,
  updateCompanyProfile,
  saveOnboarding,
  updateAvatar,
  updateCv,
  getPublicProfile,
  getProfileCompletion,
};
