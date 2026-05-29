function errorHandler(err, req, res, _next) {
  console.error('Error:', err.message);
  
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Data sudah ada. Pastikan tidak ada duplikasi.',
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Data tidak ditemukan.',
    });
  }

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'Ukuran file terlalu besar. Maksimal 5MB.',
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      error: 'Tipe file tidak didukung.',
    });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Terjadi kesalahan pada server.',
  });
}

module.exports = { errorHandler };
