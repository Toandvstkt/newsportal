'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import ProtectedRoute from '../../../../components/auth/ProtectedRoute';
import { users, roles } from '../../../../data/mockData';
import { useRouter } from 'next/navigation';

export default function AdminUsersPage() {
  const { user, hasRole } = useAuth();
  const router = useRouter();
  const [usersList, setUsersList] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'registered'
  });

  useEffect(() => {
    let filtered = usersList;
    
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterRole !== 'all') {
      filtered = filtered.filter(u => u.role === filterRole);
    }
    
    setFilteredUsers(filtered);
  }, [usersList, searchTerm, filterRole]);

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) return;
    
    const userId = Math.max(...usersList.map(u => u.id)) + 1;
    const createdUser = {
      ...newUser,
      id: userId,
      avatar: `/images/avatars/user${userId}.jpg`,
      createdAt: new Date().toISOString().split('T')[0],
      permissions: roles[newUser.role].permissions
    };
    
    setUsersList([...usersList, createdUser]);
    setNewUser({ name: '', email: '', password: '', role: 'registered' });
    setShowCreateModal(false);
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser({ ...userToEdit });
  };

  const handleUpdateUser = () => {
    setUsersList(usersList.map(u => 
      u.id === editingUser.id 
        ? { ...editingUser, permissions: roles[editingUser.role].permissions }
        : u
    ));
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (userId === user.id) {
      alert('Không thể xóa tài khoản của chính mình!');
      return;
    }
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setUsersList(usersList.filter(u => u.id !== userId));
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      editor: 'bg-blue-100 text-blue-800',
      registered: 'bg-green-100 text-green-800',
      guest: 'bg-gray-100 text-gray-800'
    };
    return colors[role] || colors.guest;
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
              <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
              <p className="text-gray-400 mt-2">Quản lý tài khoản và phân quyền người dùng</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              + Tạo người dùng mới
            </button>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="registered">Registered</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Người dùng</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Vai trò</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ngày tham gia</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Quyền</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-300">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-700/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{u.name}</div>
                            <div className="text-sm text-gray-400">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(u.role)}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {u.permissions.length} quyền
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEditUser(u)}
                            className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded text-sm transition-colors"
                          >
                            Sửa
                          </button>
                          {u.id !== user.id && (
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-sm transition-colors"
                            >
                              Xóa
                            </button>
                          )}
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
              <div className="text-3xl font-bold text-white">{usersList.length}</div>
              <div className="text-sm text-gray-400">Tổng người dùng</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-red-400">{usersList.filter(u => u.role === 'admin').length}</div>
              <div className="text-sm text-gray-400">Admin</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-blue-400">{usersList.filter(u => u.role === 'editor').length}</div>
              <div className="text-sm text-gray-400">Editor</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="text-3xl font-bold text-green-400">{usersList.filter(u => u.role === 'registered').length}</div>
              <div className="text-sm text-gray-400">Registered</div>
            </div>
          </div>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Tạo người dùng mới</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên người dùng"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="registered">Registered</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="guest">Guest</option>
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
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Tạo
                </button>
              </div>
            </div>
          </div>
        )}

        {editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h3 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                />
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                >
                  <option value="registered">Registered</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="guest">Guest</option>
                </select>
                <div className="text-sm text-gray-400">
                  Quyền: {roles[editingUser.role].permissions.length} quyền
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateUser}
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