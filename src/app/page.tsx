'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import Link from 'next/link'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const FloatingParticle = ({ delay, duration, size }) => (
    <div 
      className={`absolute bg-white opacity-20 rounded-full animate-pulse`}
      style={{
        width: size,
        height: size,
        animation: `float ${duration}s infinite ease-in-out ${delay}s, pulse 2s infinite`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {[...Array(15)].map((_, i) => (
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

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 text-center">
        <div className={`transition-all duration-2000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {user ? (
              <>
                <span 
                  className="inline-block cursor-default transition-all duration-300 ease-out" 
                  style={{ transformOrigin: 'center' }}
                >
                  Chào mừng
                </span>
                <span 
                  className="inline-block cursor-default mx-2 transition-all duration-300 ease-out" 
                  style={{ transformOrigin: 'center', transitionDelay: '50ms' }}
                >
                  trở lại!
                </span>
              </>
            ) : (
              <>
                <span 
                  className="inline-block cursor-default transition-all duration-300 ease-out" 
                  style={{ transformOrigin: 'center' }}
                >
                  News
                </span>
                <span 
                  className="inline-block cursor-default mx-2 transition-all duration-300 ease-out" 
                  style={{ transformOrigin: 'center', transitionDelay: '50ms' }}
                >
                  Portal
                </span>
              </>
            )}
          </h1>
          
          <div className="h-16 mb-8">
            <p className="text-xl md:text-2xl text-gray-300 opacity-90 animate-pulse">
              {user 
                ? "Sẵn sàng khám phá những tin tức mới nhất hôm nay"
                : "Cập nhật tin tức nhanh chóng – Chính xác – Đa chiều"
              }
            </p>
          </div>
          
          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/news"
                className="group relative inline-block"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative px-8 py-4 bg-slate-900 rounded-2xl leading-none flex items-center">
                  <span className="text-white font-semibold group-hover:text-cyan-300 transition duration-300">
                    Xem tin tức mới nhất
                  </span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition duration-300">→</span>
                </div>
              </Link>
              
              <Link
                href="/bookmarks"
                className="group px-8 py-4 border-2 border-purple-400/50 rounded-2xl text-purple-300 hover:text-white hover:border-purple-400 transition-all duration-500 transform hover:scale-105"
              >
                Tin đã lưu
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="group relative inline-block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <div className="relative px-8 py-4 bg-slate-900 rounded-2xl leading-none flex items-center">
                <span className="text-white font-semibold group-hover:text-cyan-300 transition duration-300">
                  Đăng nhập để tiếp tục
                </span>
                <span className="ml-2 transform group-hover:translate-x-1 transition duration-300">→</span>
              </div>
            </Link>
          )}
        </div>
        
        <div className="absolute top-20 left-10 w-20 h-20 border border-cyan-400/30 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-purple-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-2 h-20 bg-gradient-to-b from-transparent via-pink-400/50 to-transparent animate-pulse"></div>
      </section>

      <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto">
        {user && (
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Danh mục tin tức
          </h2>
        )}
        
        <div className="grid gap-8 md:grid-cols-3">
          {user ? (
            [
              {
                title: "Thời sự",
                description: "Cập nhật những thông tin quan trọng trong và ngoài nước.",
                gradient: "from-cyan-500 to-blue-500",
                delay: "0s",
                link: "/news/politics"
              },
              {
                title: "Công nghệ", 
                description: "Khám phá xu hướng và đột phá mới nhất trong lĩnh vực công nghệ.",
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s",
                link: "/news/tech"
              },
              {
                title: "Thể thao",
                description: "Tin tức và kết quả các trận đấu thể thao hấp dẫn.",
                gradient: "from-pink-500 to-rose-500", 
                delay: "0.4s",
                link: "/news/sports"
              }
            ].map((category, index) => (
              <a 
                key={index}
                href={category.link}
                className={`group relative block transition-all duration-700 hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: category.delay }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000`}></div>
                
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.gradient} mb-4 animate-pulse`}></div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-300 transition duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition duration-300">
                    {category.description}
                  </p>
                  
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping"></div>
                  
                  <div className="mt-4 flex items-center text-cyan-400 group-hover:text-cyan-300 transition duration-300">
                    <span className="text-sm">Xem thêm</span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition duration-300">→</span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            [
              {
                title: "Tin tức đa lĩnh vực",
                description: "Theo dõi các chuyên mục từ thời sự, thể thao, công nghệ, giải trí.",
                gradient: "from-cyan-500 to-blue-500",
                delay: "0s"
              },
              {
                title: "Tối ưu cho người dùng", 
                description: "Thiết kế trực quan, dễ dùng trên mọi thiết bị – từ máy tính đến điện thoại.",
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s"
              },
              {
                title: "Cập nhật nhanh chóng",
                description: "Luôn nhận được các bản tin nóng hổi nhất trong ngày.",
                gradient: "from-pink-500 to-rose-500", 
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group relative transition-all duration-700 hover:scale-105 hover:-translate-y-2`}
                style={{ animationDelay: feature.delay }}
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-1000`}></div>
                
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} mb-4 animate-pulse`}></div>
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-300 transition duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition duration-300">
                    {feature.description}
                  </p>
                  
                  <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {user && (
        <section className="relative z-10 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6 md:grid-cols-3 text-center">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <div className="text-3xl font-bold text-cyan-400 mb-2">1,247</div>
                <div className="text-gray-300">Tin tức hôm nay</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">89</div>
                <div className="text-gray-300">Tin đã lưu</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
                <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-gray-300">Cập nhật liên tục</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative z-10 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {user 
              ? "Luôn cập nhật tin tức mới nhất!"
              : "Bắt đầu hành trình khám phá tin tức ngay!"
            }
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link
                  href="/news"
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative text-white font-bold text-lg">
                    Đọc tin tức ngay
                  </span>
                </Link>
                
                <div className="text-gray-400 animate-bounce">hoặc</div>
                
                <a
                  href="/categories"
                  className="group px-8 py-4 border-2 border-purple-400/50 rounded-2xl text-purple-300 hover:text-white hover:border-purple-400 transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                >
                  Duyệt theo danh mục
                </a>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="group relative overflow-hidden px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:rotate-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative text-white font-bold text-lg">
                    Đăng nhập ngay
                  </span>
                </a>
                
                <div className="text-gray-400 animate-bounce">hoặc</div>
                
                <a
                  href="/explore"
                  className="group px-8 py-4 border-2 border-purple-400/50 rounded-2xl text-purple-300 hover:text-white hover:border-purple-400 transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                >
                  Khám phá ngay
                </a>
              </>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent"></div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}