# News Portal - Hướng dẫn cài đặt

## 📋 Mô tả dự án

News Portal là một ứng dụng tin tức hiện đại được xây dựng với Next.js, React và Tailwind CSS. Ứng dụng cung cấp trải nghiệm đọc tin tức tuyệt vời với giao diện đẹp mắt và tính năng phong phú.

## 🚀 Tính năng chính

- ✨ Giao diện hiện đại với hiệu ứng gradient và animation
- 🔐 Hệ thống xác thực người dùng
- 📱 Responsive design, tương thích mọi thiết bị
- 📊 Dashboard quản lý cho người dùng
- 🎨 Dark theme với hiệu ứng visual stunning
- 🔍 Tìm kiếm và phân loại tin tức
- 💾 Lưu bookmark các bài viết yêu thích

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Custom Auth Context
- **Icons**: React Icons, Lucide React

## 📦 Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0
- Git

## ⚡ Cài đặt nhanh

### 1. Clone repository

```bash
git clone https://github.com/Toandvstkt/newsportal
```

### 2. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install

# Hoặc sử dụng pnpm
pnpm install
```

### 3. Thiết lập môi trường

Tạo file `.env.local` trong thư mục root:

```env
# App Configuration
NEXT_PUBLIC_APP_NAME="News Portal"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Database (nếu sử dụng)
DATABASE_URL="your-database-url"

# Authentication (nếu cần)
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Chạy ứng dụng

```bash
# Development mode
npm run dev

# Hoặc
yarn dev

# Hoặc
pnpm dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

## 👥 Tài khoản test

Để test các tính năng login, sử dụng các tài khoản sau:

### 🔑 Admin Account
- **Email**: `admin@news.com`
- **Password**: `admin123`
- **Role**: Administrator
- **Permissions**: Full access (quản lý users, publish content, analytics, etc.)

### ✏️ Editor Account
- **Email**: `editor@news.com`
- **Password**: `editor123`
- **Role**: Editor
- **Permissions**: Create, edit, publish articles, moderate comments

### 👤 Registered User
- **Email**: `user@news.com`
- **Password**: `user123`
- **Role**: Registered User
- **Permissions**: View content, comment, bookmark, personalize feed

### 🎯 Demo Account
- **Email**: `demo@news.com`
- **Password**: `demo123`
- **Role**: Registered User
- **Permissions**: Standard user permissions

### 👻 Guest Account
- **Email**: `guest@news.com`
- **Password**: `guest123`
- **Role**: Guest
- **Permissions**: Limited access (view content, search, share)

## 🔧 Cấu hình

### Tailwind CSS

File `tailwind.config.js` đã được cấu hình với:
- Custom colors cho theme
- Animation và transition effects
- Responsive breakpoints

### Auth Context

AuthContext được thiết lập để quản lý:
- User authentication state
- Login/logout functionality
- User permissions
- Role-based access control

## 🎨 Customization

### Thay đổi theme colors

Chỉnh sửa file `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e',
      }
    }
  }
}
```

### Thêm components mới

Tạo component trong thư mục `src/components/`:

```javascript
'use client'

import { useState } from 'react';

export default function NewComponent() {
  return (
    <div className="component-wrapper">
      {/* Component content */}
    </div>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
npm run export
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Lỗi thường gặp

1. **Port đã được sử dụng**
   ```bash
   npx kill-port 3000
   npm run dev
   ```

2. **Dependencies conflict**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Tailwind styles không load**
   - Kiểm tra file `tailwind.config.js`
   - Restart development server

### Performance Issues

- Sử dụng `next/image` cho optimize images
- Enable `experimental.optimizeCss` trong `next.config.js`
- Sử dụng dynamic imports cho components lớn

## 📝 Scripts có sẵn

```bash
# Development
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run lint         # Kiểm tra linting
npm run lint:fix     # Tự động fix linting issues

# Testing (nếu có)
npm run test         # Chạy tests
npm run test:watch   # Chạy tests in watch mode
npm run test:coverage # Tạo coverage report
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

Nếu gặp vấn đề hoặc có câu hỏi, vui lòng:

- Tạo issue trên GitHub
- Contact: your-email@example.com
- Documentation: [Link to docs]

## 🎉 Acknowledgments

- Next.js team cho framework tuyệt vời
- Tailwind CSS cho utility-first CSS framework
- React team cho library mạnh mẽ
- Community contributors

---

**Happy Coding! 🚀**