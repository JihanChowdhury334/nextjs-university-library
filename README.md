# 📚 University Library Management System

A modern, full-stack library management platform built with Next.js 15, featuring a premium dark theme, real-time book borrowing, and comprehensive admin controls.

![Library System](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 **Premium Design**
- **Dark Theme** with glassmorphism effects
- **Responsive Design** - Works on all devices
- **Modern UI/UX** with smooth animations
- **Lucide React Icons** for professional look

### 📖 **Core Library Functions**
- **Browse & Search** books with advanced filtering
- **Real-time Borrowing** system with database updates
- **Return Management** with due date tracking
- **Book Details** pages with comprehensive information
- **Availability Tracking** - Live copy count updates

### 👥 **User Management**
- **Role-based Access** - Students vs Admins
- **User Authentication** with NextAuth.js
- **Personal Dashboard** - "My Books" portal
- **Borrowing History** with status tracking

### 🔧 **Admin Features**
- **Add/Manage Books** with full metadata
- **User Management** capabilities
- **Library Statistics** dashboard
- **Book Categories** management
- **PDF Receipt Generation** for borrowings

### 🗄️ **Database & Backend**
- **PostgreSQL** with Drizzle ORM
- **Type-safe** database operations
- **Migration System** for schema changes
- **RESTful API** endpoints
- **Error Handling** and validation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **PostgreSQL** | Primary database |
| **Drizzle ORM** | Type-safe database operations |
| **NextAuth.js** | Authentication & session management |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |
| **@react-pdf/renderer** | PDF generation |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JihanChowdhury334/nextjs-university-library.git
   cd nextjs-university-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_secret_key"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Features Preview

- **Modern Dark Theme** with glassmorphism effects
- **Responsive Design** that works on all devices
- **Real-time Book Borrowing** with instant updates
- **Advanced Search & Filtering** capabilities
- **Admin Dashboard** for library management
- **User Portal** for personal book tracking

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication
│   │   ├── books/         # Book management
│   │   ├── borrow/        # Borrowing system
│   │   └── return/        # Return system
│   ├── books/             # Book pages
│   ├── admin/             # Admin dashboard
│   └── my-books/          # User portal
├── components/            # Reusable components
├── db/                   # Database schema & config
└── lib/                  # Utility functions
```

## 🔑 Key Features Explained

### Real-time Book Borrowing
- **Instant Updates**: Available copies update immediately
- **Duplicate Prevention**: Users can't borrow the same book twice
- **Due Date Management**: 14-day borrowing period with tracking
- **Status Tracking**: Borrowed, returned, overdue states

### Advanced Search & Filtering
- **Debounced Search**: Optimized performance with search delays
- **Category Filtering**: Filter by book categories
- **Real-time Results**: Instant search results as you type
- **Responsive Design**: Works perfectly on mobile

### Admin Management
- **Book CRUD**: Create, read, update, delete books
- **User Management**: View and manage user accounts
- **Library Statistics**: Real-time metrics and analytics
- **Category Management**: Organize books by categories

## 🎯 Usage

### For Students
1. **Sign up/Login** to your account
2. **Browse the collection** using search and filters
3. **Click on books** to view detailed information
4. **Borrow books** with the "Borrow" button
5. **Check "My Books"** to see borrowed items
6. **Return books** when finished

### For Admins
1. **Login** with admin credentials
2. **Add new books** via the "Add Book" page
3. **Manage the collection** through the admin dashboard
4. **Monitor library statistics** and user activity
5. **Handle book returns** and overdue management

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/books` | GET, POST | List and create books |
| `/api/books/[id]` | GET | Get specific book details |
| `/api/borrow` | POST | Borrow a book |
| `/api/return` | POST | Return a book |
| `/api/my-books` | GET | Get user's borrowed books |
| `/api/categories` | GET | Get book categories |

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Great for full-stack apps
- **DigitalOcean**: VPS deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jihan Chowdhury**
- GitHub: [@JihanChowdhury334](https://github.com/JihanChowdhury334)
- Project: [University Library Management System](https://github.com/JihanChowdhury334/nextjs-university-library)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Drizzle ORM** for type-safe database operations
- **Lucide** for the beautiful icon set

---

⭐ **Star this repository if you found it helpful!**

📚 **Built with ❤️ for modern library management**