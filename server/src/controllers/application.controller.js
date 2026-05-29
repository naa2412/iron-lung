const applicationService = require('../services/application.service');

async function apply(req, res, next) {
  try {
    const { opportunityId, coverLetter, portfolioUrl } = req.body;
    const application = await applicationService.applyToOpportunity(
      req.user.id,
      opportunityId,
      { coverLetter, portfolioUrl }
    );
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
}

async function getMyApplications(req, res, next) {
  try {
    const applications = await applicationService.getMyApplications(req.user.id);
    res.json(applications);
  } catch (error) {
    next(error);
  }
}

async function getApplicants(req, res, next) {
  try {
    const applicants = await applicationService.getApplicants(req.user.id, req.params.opportunityId);
    res.json(applicants);
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!['VIEWED', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Status tidak valid' });
    }
    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      req.user.id,
      status
    );
    res.json(application);
  } catch (error) {
    next(error);
  }
}

async function trackClick(req, res, next) {
  try {
    await applicationService.trackExternalClick(req.user.id, req.params.id);
    res.json({ message: 'Klik tercatat' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  apply,
  getMyApplications,
  getApplicants,
  updateStatus,
  trackClick,
};
