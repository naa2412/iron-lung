const prisma = require('../utils/prisma');

async function getNotifications(userId, page = 1) {
  const take = 20;
  const skip = (page - 1) * take;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);

  return {
    data: notifications,
    pagination: {
      total,
      page,
      totalPages: Math.ceil(total / take),
    },
  };
}

async function getUnreadCount(userId) {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

async function markAsRead(notificationId, userId) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification || notification.userId !== userId) {
    throw Object.assign(new Error('Notifikasi tidak ditemukan'), { statusCode: 404 });
  }

  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
}

async function markAllAsRead(userId) {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
  return { message: 'Semua notifikasi telah ditandai sebagai dibaca' };
}

async function createNotification(userId, type, title, message, relatedId = null) {
  return prisma.notification.create({
    data: { userId, type, title, message, relatedId },
  });
}

module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
};
