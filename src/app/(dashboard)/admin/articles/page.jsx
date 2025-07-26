'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import ProtectedRoute from '../../../../components/auth/ProtectedRoute';
import { mockArticles, mockCategories, mockTags, users } from '../../../../data/mockData';
import { useRouter } from 'next/navigation';

export default function AdminArticlesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft',
    featured: false,
    image: ''
  });

  // Filter articles
  useEffect(() => {
    let filtered = articles;
    
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(article => article.status === filterStatus);
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(article => article.category === filterCategory);
    }
    
    setFilteredArticles(filtered);
  }, [articles, searchTerm, filterStatus, filterCategory]);

  const handleCreateArticle = () => {
    if (!newArticle.title || !newArticle.content || !newArticle.category) return;
    
    const articleId = Math.max(...articles.map(a => a.id)) + 1;
    const now = new Date().toISOString();
    const createdArticle = {
      ...newArticle,
      id: articleId,
      slug: newArticle.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      author: user.name,
      authorId: user.id,
      views: 0,
      likes: 0,
      comments: 0,
      publishedAt: newArticle.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now
    };
    
    setArticles([...articles, createdArticle]);
    setNewArticle({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: [],
      status: 'draft',
      featured: false,
      image: ''
    });
    setShowCreateModal(false);
  };

  const handleEditArticle = (article) => {
    setEditingArticle({ ...article });
  };

  const handleUpdateArticle = () => {
    const now = new Date().toISOString();
    const updatedArticle = {
      ...editingArticle,
      updatedAt: now,
      publishedAt: editingArticle.status === 'published' && !editingArticle.publishedAt ? now : editingArticle.publishedAt
    };
    
    setArticles(articles.map(a => 
      a.id === editingArticle.id ? updatedArticle : a
    ));
    setEditingArticle(null);
  };

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setArticles(articles.filter(a => a.id !== articleId));
    }
  };

  const handleToggleFeatured = (articleId) => {
    setArticles(articles.map(a => 
      a.id === articleId ? { ...a, featured: !a.featured } : a
    ));
  };

  const handleChangeStatus = (articleId, newStatus) => {
    const now = new Date().toISOString();
    setArticles(articles.map(a => 
      a.id === articleId 
        ? { 
            ...a, 
            status: newStatus,
            publishedAt: newStatus === 'published' && !a.publishedAt ? now : a.publishedAt,
            updatedAt: now
          }
        : a
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.draft;
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('vi-VN') : 'N/A';
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <button 
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white mb-4 flex items-center"
              >
                ← Quay lại Dashboard
              </button>
              <h1 className="text-3xl font-bold">Quản lý bài viết</h1>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
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
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
                <option value="archived">Lưu trữ</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                {mockCategories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              <div className="text-sm text-gray-400 flex items-center">
                Tổng: {filteredArticles.length} bài viết
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Bài viết</th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Tác giả</th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Danh mục</th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Trạng thái</th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Thống kê</th>
                    <th className="px-3 py-4 text-left text-sm font-medium text-gray-300">Ngày tạo</th>
                    <th className="px-3 py-4 text-center text-sm font-medium text-gray-300">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-700/30">
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-3">
                          {article.image && (
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-white line-clamp-2">{article.title}</div>
                            <div className="text-sm text-gray-400 line-clamp-1">{article.excerpt}</div>
                            {article.featured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                                ⭐ Nổi bật
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-300">{article.author}</td>
                      <td className="px-3 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <select
                          value={article.status}
                          onChange={(e) => handleChangeStatus(article.id, e.target.value)}
                          className={`text-xs font-semibold rounded-full px-2 py-1 border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(article.status)}`}
                        >
                          <option value="draft">Bản nháp</option>
                          <option value="published">Đã xuất bản</option>
                          <option value="archived">Lưu trữ</option>
                        </select>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-300">
                        <div>👁️ {article.views}</div>
                        <div>❤️ {article.likes}</div>
                        <div>💬 {article.comments}</div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-300">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-3 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleToggleFeatured(article.id)}
                            className={`px-2 py-1 rounded text-xs transition-colors ${
                              article.featured 
                                ? 'bg-yellow-600/20 text-yellow-400' 
                                : 'bg-gray-600/20 text-gray-400 hover:bg-yellow-600/20 hover:text-yellow-400'
                            }`}
                            title={article.featured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'}
                          >
                            ⭐
                          </button>
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-sm transition-colors"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-white">{articles.length}</div>
              <div className="text-sm text-gray-400">Tổng bài viết</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-green-400">{articles.filter(a => a.status === 'published').length}</div>
              <div className="text-sm text-gray-400">Đã xuất bản</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-yellow-400">{articles.filter(a => a.status === 'draft').length}</div>
              <div className="text-sm text-gray-400">Bản nháp</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-purple-400">{articles.filter(a => a.featured).length}</div>
              <div className="text-sm text-gray-400">Nổi bật</div>
            </div>
          </div>
        </div>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Tạo bài viết mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tiêu đề bài viết"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Tóm tắt"
                  rows={3}
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Nội dung bài viết"
                  rows={8}
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="">Chọn danh mục</option>
                    {mockCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                  <select
                    value={newArticle.status}
                    onChange={(e) => setNewArticle({...newArticle, status: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Xuất bản</option>
                  </select>
                </div>
                <input
                  type="url"
                  placeholder="URL hình ảnh"
                  value={newArticle.image}
                  onChange={(e) => setNewArticle({...newArticle, image: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newArticle.featured}
                    onChange={(e) => setNewArticle({...newArticle, featured: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Đánh dấu là bài viết nổi bật</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateArticle}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Tạo bài viết
                </button>
              </div>
            </div>
          </div>
        )}

        {editingArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Chỉnh sửa bài viết</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({...editingArticle, title: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <textarea
                  rows={3}
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({...editingArticle, excerpt: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <textarea
                  rows={8}
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({...editingArticle, content: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({...editingArticle, category: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    {mockCategories.map(category => (
                      <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                  </select>
                  <select
                    value={editingArticle.status}
                    onChange={(e) => setEditingArticle({...editingArticle, status: e.target.value})}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="published">Xuất bản</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </div>
                <input
                  type="url"
                  value={editingArticle.image}
                  onChange={(e) => setEditingArticle({...editingArticle, image: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingArticle.featured}
                    onChange={(e) => setEditingArticle({...editingArticle, featured: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Đánh dấu là bài viết nổi bật</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateArticle}
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