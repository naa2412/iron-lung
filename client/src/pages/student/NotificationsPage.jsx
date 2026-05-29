import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Bell, CheckCircle2, Send, Briefcase, AlertTriangle, Clock, Check } from 'lucide-react';
import { formatDate } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';

const TYPE_ICONS = {
  APPLICATION_UPDATE: Send,
  NEW_OPPORTUNITY: Briefcase,
  DEADLINE_REMINDER: AlertTriangle,
  NEW_APPLICANT: Send,
  OPPORTUNITY_APPROVED: CheckCircle2,
  OPPORTUNITY_REJECTED: AlertTriangle,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = () => {
    api.get('/notifications').then(({ data }) => setNotifications(data.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    } catch {}
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };

  const handleClick = (notif) => {
    if (!notif.isRead) markAsRead(notif.id);
    if (notif.relatedId) navigate(`/peluang/${notif.relatedId}`);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-h1">Notifikasi</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-text-secondary">{unreadCount} belum dibaca</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn btn-ghost btn-sm">
            <Check className="w-4 h-4" /> Tandai Semua Dibaca
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-16 rounded-glass" />)}
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((notif) => {
            const Icon = TYPE_ICONS[notif.type] || Bell;
            return (
              <button key={notif.id} onClick={() => handleClick(notif)}
                className={`w-full text-left glass-card-static p-4 flex items-start gap-4 transition-all hover:bg-white/80 ${
                  !notif.isRead ? 'border-l-4 border-l-primary' : ''
                }`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  !notif.isRead ? 'bg-primary/10' : 'bg-slate-100'
                }`}>
                  <Icon className={`w-4 h-4 ${!notif.isRead ? 'text-primary' : 'text-text-secondary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notif.isRead ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-text-placeholder mt-1">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {formatDate(notif.createdAt)}
                  </p>
                </div>
                {!notif.isRead && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <Bell className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Tidak ada notifikasi</h3>
          <p className="text-text-secondary text-sm">Kamu akan menerima notifikasi ketika ada peluang baru, update lamaran, atau pengingat deadline.</p>
        </div>
      )}
    </div>
  );
}
