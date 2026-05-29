const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

async function registerMahasiswa(data) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw Object.assign(new Error('Email sudah terdaftar'), { statusCode: 409 });
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      role: 'MAHASISWA',
      studentProfile: {
        create: {
          name: data.name,
          university: data.university,
          studyProgram: data.studyProgram,
          semester: data.semester,
        },
      },
    },
    include: {
      studentProfile: true,
    },
  });

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.studentProfile,
    },
    accessToken,
    refreshToken,
  };
}

async function registerIndustri(data) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw Object.assign(new Error('Email sudah terdaftar'), { statusCode: 409 });
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      role: 'INDUSTRI',
      companyProfile: {
        create: {
          companyName: data.companyName,
          website: data.website || null,
          description: data.description || null,
          contactEmail: data.email,
        },
      },
    },
    include: {
      companyProfile: true,
    },
  });

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.companyProfile,
    },
    accessToken,
    refreshToken,
  };
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: true,
      companyProfile: true,
    },
  });

  if (!user) {
    throw Object.assign(new Error('Email atau password salah'), { statusCode: 401 });
  }

  if (!user.isActive) {
    throw Object.assign(new Error('Akun kamu telah disuspensi'), { statusCode: 403 });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw Object.assign(new Error('Email atau password salah'), { statusCode: 401 });
  }

  const accessToken = generateAccessToken({ userId: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id });

  const profile = user.role === 'MAHASISWA' ? user.studentProfile : user.companyProfile;

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile,
    },
    accessToken,
    refreshToken,
  };
}

async function refreshTokens(token) {
  try {
    const decoded = verifyRefreshToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || !user.isActive) {
      throw Object.assign(new Error('Token tidak valid'), { statusCode: 401 });
    }

    const accessToken = generateAccessToken({ userId: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({ userId: user.id });

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw Object.assign(new Error('Refresh token tidak valid atau kadaluarsa'), { statusCode: 401 });
  }
}

module.exports = {
  registerMahasiswa,
  registerIndustri,
  login,
  refreshTokens,
};
