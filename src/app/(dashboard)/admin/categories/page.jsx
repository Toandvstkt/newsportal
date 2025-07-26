'use client'

import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import ProtectedRoute from '../../../../components/auth/ProtectedRoute';
import { mockCategories, mockTags } from '../../../../data/mockData';
import { useRouter } from 'next/navigation';

export default function AdminCategoriesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState(mockCategories);
  const [tags, setTags] = useState(mockTags);
  const [activeTab, setActiveTab] = useState('categories');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showCreateTagModal, setShowCreateTagModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingTag, setEditingTag] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
    isActive: true
  });
  const [newTag, setNewTag] = useState({
    name: ''
  });

  const handleCreateCategory = () => {
    if (!newCategory.name || !newCategory.description) return;
    
    const categoryId = Math.max(...categories.map(c => c.id)) + 1;
    const createdCategory = {
      ...newCategory,
      id: categoryId,
      slug: newCategory.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      articleCount: 0,
      createdAt: new Date().toISOString()
    };
    
    setCategories([...categories, createdCategory]);
    setNewCategory({ name: '', description: '', color: '#3b82f6', isActive: true });
    setShowCreateCategoryModal(false);
  };

  const handleEditCategory = (category) => {
    setEditingCategory({ ...category });
  };

  const handleUpdateCategory = () => {
    setCategories(categories.map(c => 
      c.id === editingCategory.id ? editingCategory : c
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleToggleCategoryStatus = (categoryId) => {
    setCategories(categories.map(c => 
      c.id === categoryId ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const handleCreateTag = () => {
    if (!newTag.name) return;
    
    const tagId = Math.max(...tags.map(t => t.id)) + 1;
    const createdTag = {
      ...newTag,
      id: tagId,
      slug: newTag.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, ''),
      count: 0
    };
    
    setTags([...tags, createdTag]);
    setNewTag({ name: '' });
    setShowCreateTagModal(false);
  };

  const handleEditTag = (tag) => {
    setEditingTag({ ...tag });
  };

  const handleUpdateTag = () => {
    setTags(tags.map(t => 
      t.id === editingTag.id ? editingTag : t
    ));
    setEditingTag(null);
  };

  const handleDeleteTag = (tagId) => {
    if (window.confirm('Bạn có chắc muốn xóa tag này?')) {
      setTags(tags.filter(t => t.id !== tagId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <button 
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white mb-4 flex items-center"
              >
                ← Quay lại Dashboard
              </button>
              <h1 className="text-3xl font-bold">Quản lý danh mục & Tags</h1>
              <p className="text-gray-400 mt-2">Quản lý danh mục và thẻ tag cho bài viết</p>
            </div>
          </div>

          <div className="flex space-x-1 mb-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'categories'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              📁 Danh mục ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'tags'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              🏷️ Tags ({tags.length})
            </button>
          </div>

          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Danh mục bài viết</h2>
                <button
                  onClick={() => setShowCreateCategoryModal(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  + Thêm danh mục
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <h3 className="font-bold text-white">{category.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleCategoryStatus(category.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            category.isActive 
                              ? 'bg-green-600/20 text-green-400' 
                              : 'bg-red-600/20 text-red-400'
                          }`}
                        >
                          {category.isActive ? '✓' : '✕'}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{category.articleCount} bài viết</span>
                      <span>Tạo: {formatDate(category.createdAt)}</span>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-sm transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-white">{categories.length}</div>
                  <div className="text-sm text-gray-400">Tổng danh mục</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-green-400">{categories.filter(c => c.isActive).length}</div>
                  <div className="text-sm text-gray-400">Đang hoạt động</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-blue-400">{categories.reduce((sum, c) => sum + c.articleCount, 0)}</div>
                  <div className="text-sm text-gray-400">Tổng bài viết</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tags' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Tags bài viết</h2>
                <button
                  onClick={() => setShowCreateTagModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                >
                  + Thêm tag
                </button>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Tên Tag</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Slug</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Số bài viết</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {tags.map((tag) => (
                        <tr key={tag.id} className="hover:bg-slate-700/30">
                          <td className="px-6 py-4">
                            <span className="inline-flex px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                              #{tag.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{tag.slug}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{tag.count} bài viết</td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => handleEditTag(tag)}
                                className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-sm transition-colors"
                              >
                                Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteTag(tag.id)}
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-white">{tags.length}</div>
                  <div className="text-sm text-gray-400">Tổng tags</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-purple-400">{tags.reduce((sum, t) => sum + t.count, 0)}</div>
                  <div className="text-sm text-gray-400">Tổng lượt sử dụng</div>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <div className="text-2xl font-bold text-pink-400">{Math.max(...tags.map(t => t.count))}</div>
                  <div className="text-sm text-gray-400">Tag phổ biến nhất</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showCreateCategoryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Tạo danh mục mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên danh mục"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Mô tả danh mục"
                  rows={3}
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-300">Màu sắc:</label>
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                    className="w-12 h-8 rounded border border-slate-600"
                  />
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newCategory.isActive}
                    onChange={(e) => setNewCategory({...newCategory, isActive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Kích hoạt danh mục</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateCategoryModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        )}

        {editingCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Chỉnh sửa danh mục</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <textarea
                  rows={3}
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-300">Màu sắc:</label>
                  <input
                    type="color"
                    value={editingCategory.color}
                    onChange={(e) => setEditingCategory({...editingCategory, color: e.target.value})}
                    className="w-12 h-8 rounded border border-slate-600"
                  />
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingCategory.isActive}
                    onChange={(e) => setEditingCategory({...editingCategory, isActive: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Kích hoạt danh mục</span>
                </label>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateCategory}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}

        {showCreateTagModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Tạo tag mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên tag"
                  value={newTag.name}
                  onChange={(e) => setNewTag({...newTag, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateTagModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateTag}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        )}

        {editingTag && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Chỉnh sửa tag</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingTag.name}
                  onChange={(e) => setEditingTag({...editingTag, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingTag(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateTag}
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