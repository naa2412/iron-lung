const rateLimit = require('express-rate-limit');

// Global rate limiter: 100 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    error: 'Terlalu banyak permintaan. Silakan coba lagi dalam beberapa saat.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth rate limiter: 5 requests per minute per IP
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: 'Terlalu banyak percobaan login. Silakan coba lagi dalam 1 menit.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { globalLimiter, authLimiter };
