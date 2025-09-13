# Smart Canteen Ordering System

A modern, responsive React-based food ordering system for canteens with comprehensive admin management capabilities.

## 🚀 Features

### User Features
- **Beautiful Homepage** with hero section and featured items
- **User Authentication** with secure login/logout
- **Interactive Menu** with categories (Breakfast, Lunch, Snacks, Beverages)
- **Shopping Cart** with quantity management
- **Order Tracking** with real-time status updates
- **User Profile** with order history and account management
- **Responsive Design** optimized for all devices
- **Dark Mode Support** with elegant transitions

### Admin Features
- **Admin Dashboard** with comprehensive analytics
- **Menu Management** - Add, edit, delete, and toggle availability
- **Order Management** - View and update order statuses
- **Real-time Statistics** - Orders, revenue, and performance metrics
- **Inventory Control** - Manage item availability

### Technical Features
- **React 18** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **React Router** for navigation
- **Axios** for API integration (ready for backend)
- **Context API** for state management
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **SEO Optimized** with proper meta tags

## 🎨 Design System

The app features a cohesive design system with:
- **Primary Color**: Warm orange (#F97316) - appetite-stimulating
- **Accent Color**: Fresh green (#16A34A) - healthy and natural
- **Beautiful Gradients** and shadows
- **Semantic Color Tokens** for consistent theming
- **Custom Component Variants** for different use cases

## 🔐 Demo Credentials

### User Login
- **Email**: `user@canteen.com`
- **Password**: `password`

### Admin Login
- **Email**: `admin@canteen.com`
- **Password**: `admin`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Navbar.tsx      # Navigation component
│   ├── LoadingSpinner.tsx
│   └── MenuItemCard.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # User login
│   ├── AdminLogin.tsx  # Admin login
│   ├── Menu.tsx        # Menu browsing
│   ├── Cart.tsx        # Shopping cart
│   ├── Orders.tsx      # Order tracking
│   ├── AdminDashboard.tsx # Admin management
│   ├── Profile.tsx     # User profile
│   └── NotFound.tsx    # 404 page
├── services/           # API integration
│   └── api.ts          # API client and endpoints
└── lib/                # Utilities
    └── utils.ts        # Helper functions
```

## 🛠️ Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔌 API Integration

The app is designed to work with a REST API. Key endpoints expected:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/register` - User registration

### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item (admin)
- `PUT /api/menu/:id` - Update menu item (admin)
- `DELETE /api/menu/:id` - Delete menu item (admin)
- `PATCH /api/menu/:id/availability` - Toggle availability (admin)

### Order Management
- `POST /api/orders` - Create new order
- `GET /api/orders/user` - Get user orders
- `GET /api/orders` - Get all orders (admin)
- `PATCH /api/orders/:id/status` - Update order status (admin)

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🎯 Key Technologies

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

## 🌟 Notable Features

### State Management
- **AuthContext** - Manages user/admin authentication state
- **CartContext** - Handles shopping cart operations with localStorage persistence

### User Experience
- **Optimistic Updates** - Immediate UI feedback
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton loaders and spinners
- **Toast Notifications** - User feedback for all actions

### Admin Dashboard
- **Real-time Statistics** - Order metrics and revenue tracking
- **Menu Management** - Full CRUD operations for menu items
- **Order Status Management** - Update order workflow
- **Availability Toggle** - Enable/disable menu items

### Responsive Design
- **Mobile-first** approach
- **Tablet optimization** 
- **Desktop layouts**
- **Touch-friendly** interactions

## 🚀 Deployment Ready

The application is production-ready with:
- Optimized build process
- SEO meta tags
- Error handling
- Loading states
- Type safety
- Clean code architecture

Ready to deploy to any static hosting service or integrate with your backend API!