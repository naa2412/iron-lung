const portfolioService = require('../services/portfolio.service');

async function getPortfolio(req, res, next) {
  try {
    const entries = await portfolioService.getPortfolio(req.user.id);
    res.json(entries);
  } catch (error) {
    next(error);
  }
}

async function createEntry(req, res, next) {
  try {
    const entry = await portfolioService.createEntry(req.user.id, req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
}

async function updateEntry(req, res, next) {
  try {
    const entry = await portfolioService.updateEntry(req.user.id, req.params.id, req.body);
    res.json(entry);
  } catch (error) {
    next(error);
  }
}

async function deleteEntry(req, res, next) {
  try {
    const result = await portfolioService.deleteEntry(req.user.id, req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPortfolio,
  createEntry,
  updateEntry,
  deleteEntry,
};
