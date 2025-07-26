'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const navItems = [
        { name: 'Trang chủ', href: '/', icon: '🏠' },
        { name: 'Tin tức', href: '/news', icon: '📰' },
        { name: 'Thể thao', href: '/sports', icon: '⚽' },
        { name: 'Giải trí', href: '/entertainment', icon: '🎬' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-2xl'
                : 'bg-transparent'
            }`}>

            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-pink-600/10 animate-pulse opacity-50"></div>

            <div
                className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/5 to-purple-400/5 blur-2xl transition-all duration-1000 ease-out pointer-events-none"
                style={{
                    left: mousePos.x - 64,
                    top: mousePos.y - 64,
                }}
            />

            <nav className="relative px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                <span className="text-2xl font-bold text-white">N</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                News Portal
                            </h1>
                            <p className="text-xs text-gray-400">Tin tức hàng đầu</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative flex items-center space-x-2">
                                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">
                                        {item.icon}
                                    </span>
                                    <span className="text-gray-300 group-hover:text-white font-medium">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">

                        <button className="group relative p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            <svg className="relative w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        <button className="group relative p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            <svg className="relative w-5 h-5 text-gray-400 group-hover:text-purple-400 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5v-3a4 4 0 00-8 0v3l-5 5h5m0 0v1a3 3 0 006 0v-1m-6 0h6" />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                        </button>

                        {user ? (
                            <>
                                <a
                                    href="/dashboard"
                                    className="group relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                    <span className="relative text-white font-semibold">Dashboard</span>
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="group relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-600 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                    <span className="relative text-white font-semibold">Đăng xuất</span>
                                </button>
                            </>
                        ) : (
                            <a
                                href="/login"
                                className="group relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                <span className="relative text-white font-semibold">Đăng nhập</span>
                            </a>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden group relative p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            <div className="relative w-6 h-6 flex flex-col justify-center space-y-1">
                                <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                                <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                                <div className={`w-6 h-0.5 bg-gray-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                            </div>
                        </button>
                    </div>
                </div>

                <div className={`lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}>
                    <div className="px-6 py-4 space-y-2">
                        {user && (
                            <a
                                href="/dashboard"
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                            >
                                <span className="text-xl">📊</span>
                                <span className="font-medium">Dashboard</span>
                            </a>
                        )}
                        {navItems.map((item, index) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="font-medium">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}