'use client'

import { useAuth } from '../../../context/AuthContext';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, hasPermission, hasRole } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const navigateToAdminPage = (path) => {
    router.push(`/admin/${path}`);
  };

  const getRoleColor = (role) => {
    const colors = {  
      admin: 'from-red-500 to-pink-500',
      editor: 'from-blue-500 to-cyan-500',
      registered: 'from-green-500 to-emerald-500',
      guest: 'from-gray-500 to-slate-500'
    };
    return colors[role] || colors.guest;
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: '👑',
      editor: '✏️',
      registered: '👤',
      guest: '🔒'
    };
    return icons[role] || icons.guest;
  };

  return (
    <ProtectedRoute requiredRole="registered">
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className={`w-20 h-20 bg-gradient-to-r ${getRoleColor(user?.role)} rounded-full flex items-center justify-center text-3xl`}>
                    {getRoleIcon(user?.role)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                  <p className="text-gray-400 mb-2">{user?.email}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 bg-gradient-to-r ${getRoleColor(user?.role)} rounded-full text-sm font-medium text-white`}>
                      {user?.role?.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-400">
                      Tham gia từ {new Date(user?.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Quyền của bạn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user?.permissions?.map((permission, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400">✓</span>
                    </div>
                    <span className="text-sm text-gray-300 capitalize">
                      {permission.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {hasRole('admin') && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-4 text-red-400">🛠️ Admin Panel</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigateToAdminPage('users')}
                    className="w-full cursor-pointer p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <div className="font-medium">Quản lý người dùng</div>
                    <div className="text-sm text-gray-400">Thêm, sửa, xóa tài khoản</div>
                  </button>
                  <button 
                    onClick={() => navigateToAdminPage('articles')}
                    className="w-full cursor-pointer p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <div className="font-medium">Quản lý bài viết</div>
                    <div className="text-sm text-gray-400">Tạo, chỉnh sửa, xóa bài viết</div>
                  </button>
                  <button 
                    onClick={() => navigateToAdminPage('categories')}
                    className="w-full cursor-pointer p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <div className="font-medium">Quản lý danh mục</div>
                    <div className="text-sm text-gray-400">Quản lý categories và tags</div>
                  </button>
                  <button 
                    onClick={() => navigateToAdminPage('analytics')}
                    className="w-full cursor-pointer p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <div className="font-medium">Xem thống kê</div>
                    <div className="text-sm text-gray-400">Analytics và báo cáo</div>
                  </button>
                  <button 
                    onClick={() => navigateToAdminPage('ads')}
                    className="w-full cursor-pointer p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 rounded-lg text-left transition-colors duration-200"
                  >
                    <div className="font-medium">Quản lý quảng cáo</div>
                    <div className="text-sm text-gray-400">Quản lý banner và quảng cáo</div>
                  </button>
                </div>
              </div>
            )}

            {hasRole('editor') && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold mb-4 text-blue-400">✏️ Editor Tools</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/50 rounded-lg text-left transition-colors duration-200">
                    <div className="font-medium">Tạo bài viết mới</div>
                    <div className="text-sm text-gray-400">Viết và xuất bản nội dung</div>
                  </button>
                  <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/50 rounded-lg text-left transition-colors duration-200">
                    <div className="font-medium">Chỉnh sửa bài viết</div>
                    <div className="text-sm text-gray-400">Cập nhật nội dung hiện có</div>
                  </button>
                  <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/50 rounded-lg text-left transition-colors duration-200">
                    <div className="font-medium">Kiểm duyệt bình luận</div>
                    <div className="text-sm text-gray-400">Duyệt và quản lý bình luận</div>
                  </button>
                </div>
              </div>
            )}

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 text-green-400">📱 Tính năng của bạn</h3>
              <div className="space-y-3">
                {hasPermission('comment_articles') && (
                  <div className="p-3 bg-green-600/20 border border-green-600/50 rounded-lg">
                    <div className="font-medium">Bình luận bài viết</div>
                    <div className="text-sm text-gray-400">Tham gia thảo luận</div>
                  </div>
                )}
                {hasPermission('save_bookmarks') && (
                  <div className="p-3 bg-green-600/20 border border-green-600/50 rounded-lg">
                    <div className="font-medium">Lưu bài viết</div>
                    <div className="text-sm text-gray-400">Bookmark nội dung yêu thích</div>
                  </div>
                )}
                {hasPermission('personalize_feed') && (
                  <div className="p-3 bg-green-600/20 border border-green-600/50 rounded-lg">
                    <div className="font-medium">Cá nhân hóa</div>
                    <div className="text-sm text-gray-400">Tùy chỉnh feed theo sở thích</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-4 text-purple-400">📊 Hoạt động gần đây</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Đăng nhập thành công</div>
                    <div className="text-xs text-gray-400">Vừa xong</div>
                  </div>
                </div>
                
                {hasPermission('comment_articles') && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Bình luận bài viết</div>
                      <div className="text-xs text-gray-400">2 giờ trước</div>
                    </div>
                  </div>
                )}
                
                {hasPermission('save_bookmarks') && (
                  <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Lưu 3 bài viết</div>
                      <div className="text-xs text-gray-400">1 ngày trước</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}