function formatDate(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function daysUntilDeadline(deadline) {
  const now = new Date();
  const dl = new Date(deadline);
  const diffTime = dl.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getDeadlineUrgency(deadline) {
  const days = daysUntilDeadline(deadline);
  if (days < 0) return 'expired';
  if (days <= 3) return 'urgent';
  if (days <= 7) return 'soon';
  return 'normal';
}

function paginate(page = 1, limit = 12) {
  const p = Math.max(1, parseInt(page));
  const l = Math.min(50, Math.max(1, parseInt(limit)));
  return {
    skip: (p - 1) * l,
    take: l,
    page: p,
    limit: l,
  };
}

function buildPaginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  };
}

module.exports = {
  formatDate,
  daysUntilDeadline,
  getDeadlineUrgency,
  paginate,
  buildPaginationMeta,
};
