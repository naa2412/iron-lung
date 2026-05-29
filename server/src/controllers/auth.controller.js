const authService = require('../services/auth.service');

async function registerMahasiswa(req, res, next) {
  try {
    const result = await authService.registerMahasiswa(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function registerIndustri(req, res, next) {
  try {
    const result = await authService.registerIndustri(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token diperlukan' });
    }
    const result = await authService.refreshTokens(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res) {
  // Mock response — no real email sent
  res.json({
    message: 'Jika email terdaftar, link reset password telah dikirim ke email kamu. Silakan cek inbox.',
  });
}

async function resetPassword(req, res) {
  // Mock response — no real password reset
  res.json({
    message: 'Password berhasil direset. Silakan login dengan password baru.',
  });
}

module.exports = {
  registerMahasiswa,
  registerIndustri,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
};
