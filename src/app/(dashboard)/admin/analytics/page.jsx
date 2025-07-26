'use client'

import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import ProtectedRoute from '../../../../components/auth/ProtectedRoute';
import { mockAnalytics } from '../../../../data/mockData';
import { useRouter } from 'next/navigation';

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const analytics = mockAnalytics;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getGrowthIcon = (growth) => {
    return growth >= 0 ? '↗️' : '↘️';
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
              <h1 className="text-3xl font-bold">Thống kê & Phân tích</h1>
              <p className="text-gray-400 mt-2">Theo dõi hiệu suất và xu hướng của website</p>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">7 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="90days">90 ngày qua</option>
              <option value="1year">1 năm qua</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(analytics.overview.growthRate.users)}`}>
                  {getGrowthIcon(analytics.overview.growthRate.users)} {analytics.overview.growthRate.users}%
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(analytics.overview.totalUsers)}
              </div>
              <div className="text-sm text-gray-400">Tổng người dùng</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(analytics.overview.growthRate.articles)}`}>
                  {getGrowthIcon(analytics.overview.growthRate.articles)} {analytics.overview.growthRate.articles}%
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(analytics.overview.totalArticles)}
              </div>
              <div className="text-sm text-gray-400">Tổng bài viết</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(analytics.overview.growthRate.views)}`}>
                  {getGrowthIcon(analytics.overview.growthRate.views)} {analytics.overview.growthRate.views}%
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(analytics.overview.totalViews)}
              </div>
              <div className="text-sm text-gray-400">Tổng lượt xem</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div className={`text-sm font-medium ${getGrowthColor(analytics.overview.growthRate.comments)}`}>
                  {getGrowthIcon(analytics.overview.growthRate.comments)} {analytics.overview.growthRate.comments}%
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {formatNumber(analytics.overview.totalComments)}
              </div>
              <div className="text-sm text-gray-400">Tổng bình luận</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6">Thống kê theo ngày</h3>
              <div className="space-y-4">
                {analytics.dailyStats.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-sm text-gray-300">
                      {new Date(day.date).toLocaleDateString('vi-VN', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{day.users} users</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">{day.articles} bài</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{day.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">{day.comments} cm</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold mb-6">Thống kê theo danh mục</h3>
              <div className="space-y-4">
                {analytics.categoryStats.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-sm font-medium text-white">{category.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {category.articles} bài • {formatNumber(category.views)} views
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          backgroundColor: category.color,
                          width: `${(category.views / Math.max(...analytics.categoryStats.map(c => c.views))) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
            <h3 className="text-xl font-bold mb-6">Bài viết phổ biến nhất</h3>
            <div className="space-y-4">
              {analytics.topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white line-clamp-1">{article.title}</h4>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span>👁️</span>
                      <span>{formatNumber(article.views)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{article.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Tỷ lệ tương tác</h4>
                  <p className="text-sm text-gray-400">Comments/Views</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {((analytics.overview.totalComments / analytics.overview.totalViews) * 100).toFixed(2)}%
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">Trung bình views/bài</h4>
                  <p className="text-sm text-gray-400">Hiệu suất nội dung</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {Math.round(analytics.overview.totalViews / analytics.overview.totalArticles)}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">👥</span>
                </div>
                <div>
                  <h4 className="font-bold text-white">User hoạt động</h4>
                  <p className="text-sm text-gray-400">Có bình luận</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {Math.round(analytics.overview.totalUsers * 0.35)}
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Hoạt động thời gian thực</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Đang cập nhật</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-sm text-gray-400">Online hiện tại</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">45</div>
                <div className="text-sm text-gray-400">Views trong giờ</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">8</div>
                <div className="text-sm text-gray-400">Comments mới</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">3</div>
                <div className="text-sm text-gray-400">Users mới</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}