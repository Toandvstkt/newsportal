'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    if (isAuthenticated && !authLoading) {
      router.push('/dashboard');
      return;
    }
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAuthenticated, authLoading, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        console.log('Login successful!', result.user);
      } else {
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingParticle = ({ delay, duration, size }) => (
    <div 
      className="absolute bg-white opacity-10 rounded-full animate-pulse"
      style={{
        width: size,
        height: size,
        animation: `float ${duration}s infinite ease-in-out ${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  const demoAccounts = [
    { email: 'admin@news.com', password: 'admin123', role: 'Admin' },
    { email: 'editor@news.com', password: 'editor123', role: 'Editor' },
    { email: 'user@news.com', password: 'user123', role: 'User' },
    { email: 'demo@news.com', password: 'demo123', role: 'Demo' },
  ];

  const fillDemoAccount = (email, password) => {
    setFormData({ email, password });
    setError('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Đang kiểm tra trạng thái đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans overflow-hidden flex items-center justify-center">
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {[...Array(10)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.3} 
            duration={3 + Math.random() * 2}
            size={`${4 + Math.random() * 8}px`}
          />
        ))}
        
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur-3xl pointer-events-none"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

      <div className={`relative z-10 w-full max-w-md mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="mb-8 text-center">
          <a 
            href="/"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors duration-300 group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Về trang chủ</span>
          </a>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">N</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  News Portal
                </h1>
              </div>
              <p className="text-gray-400">Đăng nhập vào tài khoản của bạn</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="text-cyan-400 text-sm">
                <strong>Demo Account:</strong><br/>
                Email: demo@news.com<br/>
                Password: demo123
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Nhập email của bạn"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Nhập mật khẩu"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400/20" />
                  <span className="text-sm text-gray-300">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-sm text-cyan-400 hover:text-white transition-colors duration-300">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative w-full overflow-hidden px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <span className="relative text-white font-semibold flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang đăng nhập...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </>
                  )}
                </span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Chưa có tài khoản?{' '}
                <a href="/register" className="text-cyan-400 hover:text-white transition-colors duration-300 font-medium">
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}