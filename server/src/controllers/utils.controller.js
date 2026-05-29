const { fetchMeta } = require('../services/meta.service');

async function fetchMetaTags(req, res, next) {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL wajib diisi' });
    }
    const meta = await fetchMeta(url);
    res.json(meta);
  } catch (error) {
    next(error);
  }
}

module.exports = { fetchMetaTags };
