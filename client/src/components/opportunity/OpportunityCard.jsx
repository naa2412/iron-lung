import { AlertTriangle, Clock, CheckCircle2, Bookmark, BookmarkCheck } from 'lucide-react';
import { CATEGORY_MAP, getDeadlineInfo, formatDateShort } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../lib/api';

export default function OpportunityCard({ opportunity, showMatchScore = false, onSaveToggle }) {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(opportunity.isSaved || false);

  const category = CATEGORY_MAP[opportunity.category] || { label: opportunity.category, color: 'badge-magang' };
  const deadline = getDeadlineInfo(opportunity.deadline);

  const handleSave = async (e) => {
    e.stopPropagation();
    setSaving(true);
    try {
      if (isSaved) {
        await api.delete(`/saved/${opportunity.id}`);
        setIsSaved(false);
      } else {
        await api.post(`/saved/${opportunity.id}`);
        setIsSaved(true);
      }
      onSaveToggle?.();
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  const urgencyIcon = {
    urgent: <AlertTriangle className="w-3.5 h-3.5 text-red-600" />,
    soon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
    normal: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    expired: <AlertTriangle className="w-3.5 h-3.5 text-gray-400" />,
  };

  return (
    <div
      onClick={() => navigate(`/peluang/${opportunity.id}`)}
      className="glass-card p-5 cursor-pointer flex flex-col h-full"
      id={`opportunity-${opportunity.id}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {opportunity.company?.logoUrl ? (
            <img
              src={opportunity.company.logoUrl}
              alt={opportunity.company.companyName}
              className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-100 p-1 flex-shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-sm">
                {opportunity.company?.companyName?.[0] || 'C'}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs text-text-secondary truncate">{opportunity.company?.companyName}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors flex-shrink-0"
          title={isSaved ? 'Hapus dari simpanan' : 'Simpan peluang'}
        >
          {isSaved ? (
            <BookmarkCheck className="w-5 h-5 text-primary" />
          ) : (
            <Bookmark className="w-5 h-5 text-text-secondary" />
          )}
        </button>
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-text-primary text-sm leading-snug mb-2 line-clamp-2">
        {opportunity.title}
      </h3>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`badge ${category.color}`}>{category.label}</span>
        <span className={`badge ${deadline.urgency === 'urgent' ? 'badge-urgent' : deadline.urgency === 'soon' ? 'badge-soon' : 'badge-normal'}`}>
          {urgencyIcon[deadline.urgency]}
          <span>{deadline.label}</span>
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4 flex-1">
        {(opportunity.skillsRequired || []).slice(0, 3).map((skill) => (
          <span key={skill} className="shrink-0 w-fit text-[11px] leading-none px-2 py-1 rounded-full bg-slate-100 text-text-secondary">
            {skill}
          </span>
        ))}
        {(opportunity.skillsRequired || []).length > 3 && (
          <span className="shrink-0 w-fit text-[11px] leading-none px-2 py-1 rounded-full bg-slate-100 text-text-placeholder">
            +{opportunity.skillsRequired.length - 3}
          </span>
        )}
      </div>

      {/* Match Score */}
      {showMatchScore && opportunity.matchScore != null && (
        <div className="mt-auto">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-text-secondary">Kecocokan</span>
            <span className="font-semibold text-primary">{opportunity.matchScore}% Cocok</span>
          </div>
          <div className="match-bar">
            <div
              className="match-bar-fill"
              style={{ width: `${opportunity.matchScore}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
