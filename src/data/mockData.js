export const users = [
  {
    id: 1,
    email: 'admin@news.com',
    password: 'admin123', 
    name: 'Admin User',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg',
    createdAt: '2024-01-01',
    permissions: [
      'view_content',
      'search_articles', 
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks',
      'manage_users',
      'publish_content',
      'edit_content',
      'delete_content',
      'manage_categories',
      'view_analytics'
    ]
  },
  {
    id: 2,
    email: 'editor@news.com',
    password: 'editor123',
    name: 'Editor User',
    role: 'editor',
    avatar: '/images/avatars/editor.jpg',
    createdAt: '2024-01-02',
    permissions: [
      'view_content',
      'search_articles',
      'share_content', 
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks',
      'create_articles',
      'edit_articles',
      'publish_articles',
      'moderate_comments'
    ]
  },
  {
    id: 3,
    email: 'user@news.com',
    password: 'user123',
    name: 'Registered User',
    role: 'registered',
    avatar: '/images/avatars/user.jpg',
    createdAt: '2024-01-03',
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks'
    ]
  },
  {
    id: 4,
    email: 'demo@news.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'registered',
    avatar: '/images/avatars/demo.jpg',
    createdAt: '2024-01-04',
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks'
    ]
  },
  {
    id: 5,
    email: 'guest@news.com',
    password: 'guest123',
    name: 'Guest User',
    role: 'guest',
    avatar: '/images/avatars/guest.jpg',
    createdAt: '2024-01-05',
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter'
    ]
  }
];

export const roles = {
  guest: {
    name: 'Guest',
    level: 0,
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter'
    ]
  },
  registered: {
    name: 'Registered User',
    level: 1,
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks'
    ]
  },
  editor: {
    name: 'Editor',
    level: 2,
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks',
      'create_articles',
      'edit_articles',
      'publish_articles',
      'moderate_comments'
    ]
  },
  admin: {
    name: 'Administrator',
    level: 3,
    permissions: [
      'view_content',
      'search_articles',
      'share_content',
      'subscribe_newsletter',
      'comment_articles',
      'personalize_feed',
      'save_bookmarks',
      'manage_users',
      'publish_content',
      'edit_content',
      'delete_content',
      'manage_categories',
      'view_analytics',
      'create_articles',
      'edit_articles',
      'publish_articles',
      'moderate_comments'
    ]
  }
};

export const mockArticles = [
  {
    id: 1,
    title: "Công nghệ AI đang thay đổi thế giới như thế nào?",
    slug: "cong-nghe-ai-dang-thay-doi-the-gioi",
    content: "Trí tuệ nhân tạo (AI) đang revolutionizing every aspect of our lives...",
    excerpt: "Khám phá cách AI đang biến đổi các ngành công nghiệp và cuộc sống hàng ngày của chúng ta.",
    author: "Trần Editor",
    authorId: 2,
    category: "Công nghệ",
    tags: ["AI", "Công nghệ", "Tương lai"],
    status: "published",
    featured: true,
    views: 1250,
    likes: 89,
    comments: 23,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    publishedAt: "2025-07-25T09:00:00Z",
    createdAt: "2025-07-24T15:30:00Z",
    updatedAt: "2025-07-25T09:00:00Z"
  },
  {
    id: 2,
    title: "Kinh tế Việt Nam năm 2025: Triển vọng và thử thách",
    slug: "kinh-te-viet-nam-2025-trien-vong-thu-thach",
    content: "Năm 2025 đánh dấu một giai đoạn quan trọng trong phát triển kinh tế Việt Nam...",
    excerpt: "Phân tích tình hình kinh tế Việt Nam trong năm 2025 với những cơ hội và thách thức.",
    author: "Nguyễn Admin",
    authorId: 1,
    category: "Kinh tế",
    tags: ["Kinh tế", "Việt Nam", "2025"],
    status: "published",
    featured: false,
    views: 890,
    likes: 45,
    comments: 12,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    publishedAt: "2025-07-24T14:20:00Z",
    createdAt: "2025-07-24T10:15:00Z",
    updatedAt: "2025-07-24T14:20:00Z"
  },
  {
    id: 3,
    title: "World Cup 2025: Những kỳ vọng từ đội tuyển Việt Nam",
    slug: "world-cup-2025-ky-vong-doi-tuyen-viet-nam",
    content: "Đội tuyển Việt Nam đang chuẩn bị cho World Cup 2025 với nhiều hy vọng...",
    excerpt: "Cập nhật thông tin mới nhất về đội tuyển Việt Nam tại World Cup 2025.",
    author: "Trần Editor",
    authorId: 2,
    category: "Thể thao",
    tags: ["World Cup", "Bóng đá", "Việt Nam"],
    status: "draft",
    featured: false,
    views: 0,
    likes: 0,
    comments: 0,
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop",
    publishedAt: null,
    createdAt: "2025-07-26T08:45:00Z",
    updatedAt: "2025-07-26T08:45:00Z"
  }
];

export const mockCategories = [
  {
    id: 1,
    name: "Công nghệ",
    slug: "cong-nghe",
    description: "Tin tức về công nghệ, AI, và đổi mới sáng tạo",
    color: "#3b82f6",
    articleCount: 45,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "Kinh tế",
    slug: "kinh-te",
    description: "Thông tin kinh tế, tài chính, và thị trường",
    color: "#10b981",
    articleCount: 32,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 3,
    name: "Thể thao",
    slug: "the-thao",
    description: "Tin tức thể thao trong và ngoài nước",
    color: "#f59e0b",
    articleCount: 28,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z"
  },
  {
    id: 4,
    name: "Giải trí",
    slug: "giai-tri",
    description: "Showbiz, phim ảnh, và văn hóa giải trí",
    color: "#ef4444",
    articleCount: 19,
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z"
  }
];

export const mockTags = [
  { id: 1, name: "AI", slug: "ai", count: 15 },
  { id: 2, name: "Công nghệ", slug: "cong-nghe", count: 45 },
  { id: 3, name: "Kinh tế", slug: "kinh-te", count: 32 },
  { id: 4, name: "Bóng đá", slug: "bong-da", count: 18 },
  { id: 5, name: "World Cup", slug: "world-cup", count: 8 },
  { id: 6, name: "Việt Nam", slug: "viet-nam", count: 25 },
  { id: 7, name: "Tương lai", slug: "tuong-lai", count: 12 },
  { id: 8, name: "Đầu tư", slug: "dau-tu", count: 20 }
];

export const mockComments = [
  {
    id: 1,
    articleId: 1,
    articleTitle: "Công nghệ AI đang thay đổi thế giới như thế nào?",
    author: "Lê User",
    authorId: 3,
    content: "Bài viết rất hay và có nhiều thông tin bổ ích về AI. Cảm ơn tác giả!",
    status: "approved",
    likes: 5,
    createdAt: "2025-07-25T10:30:00Z",
    updatedAt: "2025-07-25T10:30:00Z"
  },
  {
    id: 2,
    articleId: 1,
    articleTitle: "Công nghệ AI đang thay đổi thế giới như thế nào?",
    author: "Phạm User",
    authorId: 4,
    content: "AI có thể thay thế con người trong tương lai không? Hơi lo lắng về điều này.",
    status: "pending",
    likes: 2,
    createdAt: "2025-07-25T14:15:00Z",
    updatedAt: "2025-07-25T14:15:00Z"
  },
  {
    id: 3,
    articleId: 2,
    articleTitle: "Kinh tế Việt Nam năm 2025: Triển vọng và thử thách",
    author: "Trần Đầu tư",
    authorId: 5,
    content: "Thông tin rất hữu ích cho những ai quan tâm đến thị trường chứng khoán VN.",
    status: "approved",
    likes: 8,
    createdAt: "2025-07-24T16:45:00Z",
    updatedAt: "2025-07-24T16:45:00Z"
  },
  {
    id: 4,
    articleId: 1,
    articleTitle: "Công nghệ AI đang thay đổi thế giới như thế nào?",
    author: "Anonymous",
    authorId: null,
    content: "Spam content here... Buy cheap products now!",
    status: "rejected",
    likes: 0,
    createdAt: "2025-07-25T20:00:00Z",
    updatedAt: "2025-07-25T20:30:00Z"
  }
];

export const mockAnalytics = {
  overview: {
    totalUsers: 1250,
    totalArticles: 156,
    totalViews: 45670,
    totalComments: 892,
    growthRate: {
      users: 12.5,
      articles: 8.3,
      views: 23.1,
      comments: 15.7
    }
  },
  dailyStats: [
    { date: "2025-07-20", users: 45, articles: 3, views: 1250, comments: 12 },
    { date: "2025-07-21", users: 52, articles: 2, views: 1180, comments: 15 },
    { date: "2025-07-22", users: 38, articles: 4, views: 1420, comments: 8 },
    { date: "2025-07-23", users: 61, articles: 1, views: 980, comments: 18 },
    { date: "2025-07-24", users: 48, articles: 5, views: 1650, comments: 22 },
    { date: "2025-07-25", users: 55, articles: 3, views: 1380, comments: 14 },
    { date: "2025-07-26", users: 42, articles: 2, views: 890, comments: 9 }
  ],
  topArticles: [
    { id: 1, title: "Công nghệ AI đang thay đổi thế giới như thế nào?", views: 1250, likes: 89 },
    { id: 2, title: "Kinh tế Việt Nam năm 2025: Triển vọng và thử thách", views: 890, likes: 45 },
    { id: 5, title: "Du lịch Việt Nam: Top 10 điểm đến hot nhất", views: 750, likes: 62 }
  ],
  categoryStats: [
    { name: "Công nghệ", articles: 45, views: 12500, color: "#3b82f6" },
    { name: "Kinh tế", articles: 32, views: 8900, color: "#10b981" },
    { name: "Thể thao", articles: 28, views: 7200, color: "#f59e0b" },
    { name: "Giải trí", articles: 19, views: 4800, color: "#ef4444" }
  ]
};

export const mockAds = [
  {
    id: 1,
    title: "Banner Trang chủ - Samsung Galaxy S25",
    type: "banner",
    position: "homepage-top",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=200&fit=crop",
    link: "https://samsung.com",
    status: "active",
    impressions: 15420,
    clicks: 234,
    ctr: 1.52,
    startDate: "2025-07-01T00:00:00Z",
    endDate: "2025-07-31T23:59:59Z",
    createdAt: "2025-06-28T10:00:00Z"
  },
  {
    id: 2,
    title: "Sidebar - Khóa học lập trình",
    type: "sidebar",
    position: "article-sidebar",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=250&fit=crop",
    link: "https://programming-course.com",
    status: "active",
    impressions: 8930,
    clicks: 178,
    ctr: 1.99,
    startDate: "2025-07-15T00:00:00Z",
    endDate: "2025-08-15T23:59:59Z",
    createdAt: "2025-07-12T14:30:00Z"
  },
  {
    id: 3,
    title: "Pop-up - Ứng dụng Mobile Banking",
    type: "popup",
    position: "site-wide",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    link: "https://mobilebank.com",
    status: "paused",
    impressions: 5670,
    clicks: 45,
    ctr: 0.79,
    startDate: "2025-07-10T00:00:00Z",
    endDate: "2025-08-10T23:59:59Z",
    createdAt: "2025-07-08T09:15:00Z"
  }
];