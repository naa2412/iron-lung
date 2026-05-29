function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Token autentikasi diperlukan' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Kamu tidak memiliki akses untuk melakukan tindakan ini' 
      });
    }

    next();
  };
}

module.exports = { roleMiddleware };
