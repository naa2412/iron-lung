const adminService = require('../services/admin.service');

async function getStats(req, res, next) {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
}

async function getPendingOpportunities(req, res, next) {
  try {
    const opportunities = await adminService.getPendingOpportunities();
    res.json(opportunities);
  } catch (error) {
    next(error);
  }
}

async function approveOpportunity(req, res, next) {
  try {
    const opportunity = await adminService.approveOpportunity(req.params.id);
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
}

async function rejectOpportunity(req, res, next) {
  try {
    const { reason } = req.body;
    if (!reason) {
      return res.status(400).json({ error: 'Alasan penolakan wajib diisi' });
    }
    const opportunity = await adminService.rejectOpportunity(req.params.id, reason);
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const result = await adminService.getUsers(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function suspendUser(req, res, next) {
  try {
    await adminService.suspendUser(req.params.id);
    res.json({ message: 'Pengguna berhasil disuspensi' });
  } catch (error) {
    next(error);
  }
}

async function activateUser(req, res, next) {
  try {
    await adminService.activateUser(req.params.id);
    res.json({ message: 'Pengguna berhasil diaktifkan kembali' });
  } catch (error) {
    next(error);
  }
}

async function getRegistrationAnalytics(req, res, next) {
  try {
    const data = await adminService.getRegistrationAnalytics();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getCategoryAnalytics(req, res, next) {
  try {
    const data = await adminService.getCategoryAnalytics();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function getRoleAnalytics(req, res, next) {
  try {
    const data = await adminService.getRoleAnalytics();
    res.json(data);
  } catch (error) {
    next(error);
  }
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
