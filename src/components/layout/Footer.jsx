
'use client'

import { useState, useEffect } from 'react';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const footerSections = [
    {
      title: "Chuyên mục",
      links: [
        { name: "Thời sự", href: "/news" },
        { name: "Thể thao", href: "/sports" },
        { name: "Công nghệ", href: "/tech" },
        { name: "Giải trí", href: "/entertainment" },
        { name: "Kinh tế", href: "/economy" }
      ]
    },
    {
      title: "Hỗ trợ",
      links: [
        { name: "Liên hệ", href: "/contact" },
        { name: "Câu hỏi thường gặp", href: "/faq" },
        { name: "Hướng dẫn", href: "/guide" },
        { name: "Báo lỗi", href: "/report" },
        { name: "Góp ý", href: "/feedback" }
      ]
    },
    {
      title: "Thông tin",
      links: [
        { name: "Về chúng tôi", href: "/about" },
        { name: "Chính sách", href: "/policy" },
        { name: "Điều khoản", href: "/terms" },
        { name: "Bảo mật", href: "/privacy" },
        { name: "Tuyển dụng", href: "/careers" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#", color: "from-blue-500 to-blue-600" },
    { name: "Twitter", icon: "🐦", href: "#", color: "from-cyan-400 to-blue-500" },
    { name: "Instagram", icon: "📷", href: "#", color: "from-pink-500 to-purple-500" },
    { name: "YouTube", icon: "📺", href: "#", color: "from-red-500 to-red-600" },
    { name: "LinkedIn", icon: "💼", href: "#", color: "from-blue-600 to-blue-700" }
  ];

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

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black text-white mt-20 overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 via-purple-600/5 to-pink-600/5 animate-pulse"></div>
        
        {[...Array(8)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.5} 
            duration={4 + Math.random() * 2}
            size={`${3 + Math.random() * 6}px`}
          />
        ))}
        
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/5 to-purple-400/5 blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePos.x - 128,
            top: mousePos.y - 128,
          }}
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className={`lg:col-span-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <span className="text-3xl font-bold text-white">N</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  News Portal
                </h3>
                <p className="text-gray-400 text-sm">Tin tức hàng đầu Việt Nam</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Mang đến những thông tin chính xác, nhanh chóng và đa chiều. 
              Kết nối bạn với thế giới thông qua những câu chuyện ý nghĩa.
            </p>
            
            <div className="group">
              <p className="text-sm text-gray-400 mb-3">Đăng ký nhận tin mới:</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="email@example.com"
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-l-lg focus:border-cyan-400/50 focus:outline-none text-white placeholder-gray-500 transition duration-300"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-r-lg hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-semibold">→</span>
                </button>
              </div>
            </div>
          </div>

          {footerSections.map((section, sectionIndex) => (
            <div 
              key={section.title}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(sectionIndex + 1) * 0.2}s` }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white relative">
                {section.title}
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="group text-gray-400 hover:text-white transition-all duration-300 flex items-center space-x-2"
                      style={{ transitionDelay: `${linkIndex * 0.1}s` }}
                    >
                      <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-150"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Theo dõi chúng tôi:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-xl opacity-0 group-hover:opacity-100 transition duration-300`}></div>
                  <div className="absolute inset-0 bg-slate-800/50 rounded-xl group-hover:bg-transparent transition duration-300"></div>
                  <span className="relative text-xl group-hover:scale-125 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">1M+</div>
                <div>Độc giả</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">50K+</div>
                <div>Bài viết</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-pink-400">24/7</div>
                <div>Cập nhật</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/30 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 News Portal.
              <span className="mx-2">•</span>
              Made with <span className="text-red-400 animate-pulse">DinhVanToan</span> 
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-16 h-16 border border-cyan-400/20 rounded-full animate-spin-slow"></div>
      <div className="absolute top-20 right-10 w-12 h-12 border border-purple-400/20 rounded-full animate-bounce"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </footer>
  );
}