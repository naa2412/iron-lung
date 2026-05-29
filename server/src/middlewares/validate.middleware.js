const { ZodError } = require('zod');
const { sanitizeObject } = require('../utils/sanitize');

function validate(schema) {
  return (req, res, next) => {
    try {
      // Sanitize input before validation
      if (req.body) {
        req.body = sanitizeObject(req.body);
      }
      
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return res.status(400).json({
          error: 'Validasi gagal',
          details: errors,
        });
      }
      next(error);
    }
  };
}

module.exports = { validate };
