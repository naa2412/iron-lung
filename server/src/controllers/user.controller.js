const userService = require('../services/user.service');

async function getMe(req, res, next) {
  try {
    const user = await userService.getCurrentUser(req.user.id);
    const completion = await userService.getProfileCompletion(req.user.id);
    res.json({ ...user, profileCompletion: completion });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    let profile;
    if (req.user.role === 'MAHASISWA') {
      profile = await userService.updateStudentProfile(req.user.id, req.body);
    } else if (req.user.role === 'INDUSTRI') {
      profile = await userService.updateCompanyProfile(req.user.id, req.body);
    }
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

async function saveOnboarding(req, res, next) {
  try {
    const { interests } = req.body;
    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ error: 'Bidang minat wajib diisi' });
    }
    const profile = await userService.saveOnboarding(req.user.id, interests);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File avatar wajib diupload' });
    }

    // For Cloudinary integration — in development, use a placeholder
    const { uploadToCloudinary } = require('../utils/cloudinary');
    let avatarUrl;
    try {
      const result = await uploadToCloudinary(req.file.path, 'iron-lung/avatars');
      avatarUrl = result.url;
    } catch {
      // Fallback: use a data URL or placeholder if Cloudinary is not configured
      avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent('User')}&background=2563EB&color=fff`;
    }

    await userService.updateAvatar(req.user.id, avatarUrl);
    res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
}

async function uploadCv(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File CV wajib diupload' });
    }

    const { uploadToCloudinary } = require('../utils/cloudinary');
    let cvUrl;
    try {
      const result = await uploadToCloudinary(req.file.path, 'iron-lung/cvs');
      cvUrl = result.url;
    } catch {
      cvUrl = '/uploads/cv-placeholder.pdf';
    }

    await userService.updateCv(req.user.id, cvUrl);
    res.json({ cvUrl });
  } catch (error) {
    next(error);
  }
}

async function getPublicProfile(req, res, next) {
  try {
    const profile = await userService.getPublicProfile(req.params.profileId);
    res.json(profile);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMe,
  updateProfile,
  saveOnboarding,
  uploadAvatar,
  uploadCv,
  getPublicProfile,
};
