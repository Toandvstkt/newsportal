'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import ProtectedRoute from '../../../../components/auth/ProtectedRoute';
import { mockAds } from '../../../../data/mockData';
import { useRouter } from 'next/navigation';

export default function AdminAdsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [ads, setAds] = useState(mockAds);
  const [filteredAds, setFilteredAds] = useState(mockAds);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [newAd, setNewAd] = useState({
    title: '',
    type: 'banner',
    position: 'homepage-top',
    image: '',
    link: '',
    status: 'active',
    startDate: '',
    endDate: ''
  });

  // Filter ads
  useEffect(() => {
    let filtered = ads;
    
    if (searchTerm) {
      filtered = filtered.filter(ad => 
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.link.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(ad => ad.status === filterStatus);
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(ad => ad.type === filterType);
    }
    
    setFilteredAds(filtered);
  }, [ads, searchTerm, filterStatus, filterType]);

  const handleCreateAd = () => {
    if (!newAd.title || !newAd.image || !newAd.link) return;
    
    const adId = Math.max(...ads.map(a => a.id)) + 1;
    const now = new Date().toISOString();
    const createdAd = {
      ...newAd,
      id: adId,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      createdAt: now
    };
    
    setAds([...ads, createdAd]);
    setNewAd({
      title: '',
      type: 'banner',
      position: 'homepage-top',
      image: '',
      link: '',
      status: 'active',
      startDate: '',
      endDate: ''
    });
    setShowCreateModal(false);
  };

  const handleEditAd = (ad) => {
    setEditingAd({ 
      ...ad,
      startDate: ad.startDate.split('T')[0],
      endDate: ad.endDate.split('T')[0]
    });
  };

  const handleUpdateAd = () => {
    const updatedAd = {
      ...editingAd,
      startDate: editingAd.startDate + 'T00:00:00Z',
      endDate: editingAd.endDate + 'T23:59:59Z'
    };
    
    setAds(ads.map(a => 
      a.id === editingAd.id ? updatedAd : a
    ));
    setEditingAd(null);
  };

  const handleDeleteAd = (adId) => {
    if (window.confirm('Bạn có chắc muốn xóa quảng cáo này?')) {
      setAds(ads.filter(a => a.id !== adId));
    }
  };

  const handleToggleStatus = (adId) => {
    setAds(ads.map(a => 
      a.id === adId 
        ? { ...a, status: a.status === 'active' ? 'paused' : 'active' }
        : a
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.active;
  };

  const getTypeColor = (type) => {
    const colors = {
      banner: 'bg-blue-100 text-blue-800',
      sidebar: 'bg-purple-100 text-purple-800',
      popup: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || colors.banner;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Check if ad is expired
  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const positionOptions = {
    'homepage-top': 'Trang chủ - Top',
    'homepage-middle': 'Trang chủ - Giữa',
    'homepage-bottom': 'Trang chủ - Bottom',
    'article-top': 'Bài viết - Top',
    'article-middle': 'Bài viết - Giữa',
    'article-bottom': 'Bài viết - Bottom',
    'article-sidebar': 'Sidebar bài viết',
    'site-wide': 'Toàn site'
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <button 
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white mb-4 flex items-center"
              >
                ← Quay lại Dashboard
              </button>
              <h1 className="text-3xl font-bold">Quản lý quảng cáo</h1>
              <p className="text-gray-400 mt-2">Quản lý banner và quảng cáo trên website</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              + Tạo quảng cáo mới
            </button>
          </div>

          {/* Filters */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Tìm kiếm quảng cáo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang chạy</option>
                <option value="paused">Tạm dừng</option>
                <option value="expired">Hết hạn</option>
              </select>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả loại</option>
                <option value="banner">Banner</option>
                <option value="sidebar">Sidebar</option>
                <option value="popup">Popup</option>
              </select>
              <div className="text-sm text-gray-400 flex items-center">
                Tổng: {filteredAds.length} quảng cáo
              </div>
            </div>
          </div>

          {/* Ads Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                {/* Ad Preview */}
                <div className="mb-4">
                  <img 
                    src={ad.image} 
                    alt={ad.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Ad Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-white line-clamp-1">{ad.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-1">{ad.link}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      isExpired(ad.endDate) ? 'expired' : ad.status
                    )}`}>
                      {isExpired(ad.endDate) ? 'HẾT HẠN' : ad.status.toUpperCase()}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(ad.type)}`}>
                      {ad.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-sm text-gray-400">
                    <div>Vị trí: {positionOptions[ad.position]}</div>
                    <div>Từ {formatDate(ad.startDate)} đến {formatDate(ad.endDate)}</div>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="font-bold text-blue-400">{ad.impressions.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Impressions</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="font-bold text-green-400">{ad.clicks}</div>
                      <div className="text-xs text-gray-400">Clicks</div>
                    </div>
                    <div className="bg-slate-700/30 rounded p-2">
                      <div className="font-bold text-purple-400">{ad.ctr}%</div>
                      <div className="text-xs text-gray-400">CTR</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
                    <button
                      onClick={() => handleToggleStatus(ad.id)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        ad.status === 'active' 
                          ? 'bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400'
                          : 'bg-green-600/20 hover:bg-green-600/30 text-green-400'
                      }`}
                    >
                      {ad.status === 'active' ? 'Tạm dừng' : 'Kích hoạt'}
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAd(ad)}
                        className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-sm transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteAd(ad.id)}
                        className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-white">{ads.length}</div>
              <div className="text-sm text-gray-400">Tổng quảng cáo</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-green-400">{ads.filter(a => a.status === 'active' && !isExpired(a.endDate)).length}</div>
              <div className="text-sm text-gray-400">Đang chạy</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-blue-400">{ads.reduce((sum, a) => sum + a.impressions, 0).toLocaleString()}</div>
              <div className="text-sm text-gray-400">Tổng impressions</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-purple-400">{ads.reduce((sum, a) => sum + a.clicks, 0)}</div>
              <div className="text-sm text-gray-400">Tổng clicks</div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold mb-6">Hiệu suất quảng cáo</h3>
            <div className="space-y-4">
              {ads.map((ad) => (
                <div key={`perf-${ad.id}`} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={ad.image} 
                      alt={ad.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-white line-clamp-1">{ad.title}</h4>
                      <p className="text-sm text-gray-400">{positionOptions[ad.position]}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-blue-400">{ad.impressions.toLocaleString()}</div>
                      <div className="text-gray-400">Impressions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-400">{ad.clicks}</div>
                      <div className="text-gray-400">Clicks</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-400">{ad.ctr}%</div>
                      <div className="text-gray-400">CTR</div>
                    </div>
                    <div className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      isExpired(ad.endDate) ? 'expired' : ad.status
                    )}`}>
                      {isExpired(ad.endDate) ? 'HẾT HẠN' : ad.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Ad Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Tạo quảng cáo mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tiêu đề quảng cáo"
                  value={newAd.title}
                  onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newAd.type}
                    onChange={(e) => setNewAd({...newAd, type: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="banner">Banner</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="popup">Popup</option>
                  </select>
                  <select
                    value={newAd.position}
                    onChange={(e) => setNewAd({...newAd, position: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    {Object.entries(positionOptions).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="url"
                  placeholder="URL hình ảnh"
                  value={newAd.image}
                  onChange={(e) => setNewAd({...newAd, image: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="url"
                  placeholder="Link đích"
                  value={newAd.link}
                  onChange={(e) => setNewAd({...newAd, link: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ngày bắt đầu</label>
                    <input
                      type="date"
                      value={newAd.startDate}
                      onChange={(e) => setNewAd({...newAd, startDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={newAd.endDate}
                      onChange={(e) => setNewAd({...newAd, endDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <select
                  value={newAd.status}
                  onChange={(e) => setNewAd({...newAd, status: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="active">Kích hoạt</option>
                  <option value="paused">Tạm dừng</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateAd}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Tạo quảng cáo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Ad Modal */}
        {editingAd && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Chỉnh sửa quảng cáo</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingAd.title}
                  onChange={(e) => setEditingAd({...editingAd, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={editingAd.type}
                    onChange={(e) => setEditingAd({...editingAd, type: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="banner">Banner</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="popup">Popup</option>
                  </select>
                  <select
                    value={editingAd.position}
                    onChange={(e) => setEditingAd({...editingAd, position: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    {Object.entries(positionOptions).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="url"
                  value={editingAd.image}
                  onChange={(e) => setEditingAd({...editingAd, image: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <input
                  type="url"
                  value={editingAd.link}
                  onChange={(e) => setEditingAd({...editingAd, link: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ngày bắt đầu</label>
                    <input
                      type="date"
                      value={editingAd.startDate}
                      onChange={(e) => setEditingAd({...editingAd, startDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ngày kết thúc</label>
                    <input
                      type="date"
                      value={editingAd.endDate}
                      onChange={(e) => setEditingAd({...editingAd, endDate: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                    />
                  </div>
                </div>
                <select
                  value={editingAd.status}
                  onChange={(e) => setEditingAd({...editingAd, status: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="active">Kích hoạt</option>
                  <option value="paused">Tạm dừng</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingAd(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateAd}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}