const opportunityService = require('../services/opportunity.service');
const { getRecommended } = require('../services/recommendation.service');

async function getOpportunities(req, res, next) {
  try {
    const userId = req.user ? req.user.id : null;
    const result = await opportunityService.getOpportunities(req.query, userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getOpportunityById(req, res, next) {
  try {
    const userId = req.user ? req.user.id : null;
    const opportunity = await opportunityService.getOpportunityById(req.params.id, userId);
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
}

async function getRecommendedOpportunities(req, res, next) {
  try {
    const opportunities = await getRecommended(req.user.id, parseInt(req.query.limit) || 6);
    res.json(opportunities);
  } catch (error) {
    next(error);
  }
}

async function getTrending(req, res, next) {
  try {
    const opportunities = await opportunityService.getTrending(parseInt(req.query.limit) || 6);
    res.json(opportunities);
  } catch (error) {
    next(error);
  }
}

async function createOpportunity(req, res, next) {
  try {
    const opportunity = await opportunityService.createOpportunity(req.user.id, req.body);
    res.status(201).json(opportunity);
  } catch (error) {
    next(error);
  }
}

async function updateOpportunity(req, res, next) {
  try {
    const opportunity = await opportunityService.updateOpportunity(req.params.id, req.user.id, req.body);
    res.json(opportunity);
  } catch (error) {
    next(error);
  }
}

async function deleteOpportunity(req, res, next) {
  try {
    const result = await opportunityService.deleteOpportunity(req.params.id, req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getCompanyListings(req, res, next) {
  try {
    const listings = await opportunityService.getCompanyListings(req.user.id);
    res.json(listings);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOpportunities,
  getOpportunityById,
  getRecommendedOpportunities,
  getTrending,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getCompanyListings,
};
