import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import OpportunityCard from '../../components/opportunity/OpportunityCard';
import api from '../../lib/api';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { CATEGORY_MAP, INTEREST_OPTIONS } from '../../lib/constants';

export default function OpportunitiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [locationType, setLocationType] = useState('');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (locationType) params.set('locationType', locationType);
      if (sort === 'deadline') params.set('sort', 'deadline');
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '12');

      const { data } = await api.get(`/opportunities?${params.toString()}`);
      setOpportunities(data.data);
      setPagination(data.pagination);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [category, locationType, sort, searchParams.get('page')]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setLocationType('');
    setSort('newest');
    setSearchParams({});
  };

  const hasFilters = search || category || locationType || sort !== 'newest';

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-h1 mb-1">Jelajahi Peluang</h1>
        <p className="text-text-secondary">
          {pagination.total ? `${pagination.total} peluang aktif tersedia` : 'Memuat peluang...'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card-static p-4 mb-6 sticky top-0 z-10">
        <form onSubmit={handleSearch} className="flex gap-3 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-placeholder" />
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari peluang, perusahaan, atau skill..."
              className="input-field pl-10"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-md">Cari</button>
          <button type="button" onClick={() => setShowFilters(!showFilters)}
            className="btn btn-ghost btn-md md:hidden">
            <Filter className="w-4 h-4" />
          </button>
        </form>

        <div className={`flex flex-wrap gap-3 ${showFilters ? '' : 'hidden md:flex'}`}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="input-field w-auto min-w-[140px] text-sm py-2">
            <option value="">Semua Kategori</option>
            {Object.entries(CATEGORY_MAP).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select value={locationType} onChange={(e) => setLocationType(e.target.value)}
            className="input-field w-auto min-w-[120px] text-sm py-2">
            <option value="">Semua Lokasi</option>
            <option value="REMOTE">Remote</option>
            <option value="ONSITE">On-site</option>
            <option value="HYBRID">Hybrid</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="input-field w-auto min-w-[140px] text-sm py-2">
            <option value="newest">Terbaru</option>
            <option value="deadline">Deadline Terdekat</option>
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="btn btn-ghost btn-sm text-danger">
              <X className="w-4 h-4" /> Hapus Filter
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-static p-5">
              <div className="skeleton h-4 w-1/3 mb-3" />
              <div className="skeleton h-5 w-3/4 mb-2" />
              <div className="skeleton h-4 w-1/2 mb-4" />
              <div className="skeleton h-2 w-full" />
            </div>
          ))}
        </div>
      ) : opportunities.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} showMatchScore />
            ))}
          </div>
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {[...Array(pagination.totalPages)].map((_, i) => (
                <button key={i}
                  onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: String(i + 1) })}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    pagination.page === i + 1
                      ? 'bg-primary text-white'
                      : 'bg-white text-text-secondary hover:bg-surface-secondary'
                  }`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="glass-card-static p-12 text-center">
          <Search className="w-12 h-12 text-text-placeholder mx-auto mb-3" />
          <h3 className="font-heading text-h3 mb-2">Tidak ada peluang ditemukan</h3>
          <p className="text-text-secondary text-sm mb-4">Coba ubah filter pencarian atau hapus kata kunci.</p>
          <button onClick={clearFilters} className="btn btn-primary btn-sm">Hapus Semua Filter</button>
        </div>
      )}
    </div>
  );
}
