import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'News Portal - Cổng thông tin tin tức',
  description: 'Nền tảng tin tức hiện đại với hệ thống phân quyền người dùng',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AuthProvider>
          <Header />  
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}