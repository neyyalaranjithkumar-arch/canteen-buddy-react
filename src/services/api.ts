import axios from 'axios';

// Configure base URL - replace with your actual API URL
const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('canteen_user');
    const admin = localStorage.getItem('canteen_admin');
    
    if (user) {
      const userData = JSON.parse(user);
      config.headers.Authorization = `Bearer ${userData.token}`;
    } else if (admin) {
      const adminData = JSON.parse(admin);
      config.headers.Authorization = `Bearer ${adminData.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('canteen_user');
      localStorage.removeItem('canteen_admin');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'breakfast' | 'lunch' | 'snacks' | 'beverages';
  available: boolean;
  ingredients?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedTime?: number;
}

export interface CreateOrderRequest {
  items: Array<{
    menuItemId: string;
    quantity: number;
  }>;
}

// Auth API calls
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  adminLogin: (email: string, password: string) =>
    api.post('/auth/admin/login', { email, password }),
  
  register: (userData: { name: string; email: string; password: string; phone: string }) =>
    api.post('/auth/register', userData),
};

// Menu API calls
export const menuAPI = {
  getMenuItems: () => api.get<MenuItem[]>('/menu'),
  
  getMenuItemById: (id: string) => api.get<MenuItem>(`/menu/${id}`),
  
  getMenuByCategory: (category: string) => api.get<MenuItem[]>(`/menu/category/${category}`),
  
  // Admin only
  createMenuItem: (menuItem: Omit<MenuItem, 'id'>) =>
    api.post<MenuItem>('/menu', menuItem),
  
  updateMenuItem: (id: string, updates: Partial<MenuItem>) =>
    api.put<MenuItem>(`/menu/${id}`, updates),
  
  deleteMenuItem: (id: string) => api.delete(`/menu/${id}`),
  
  updateAvailability: (id: string, available: boolean) =>
    api.patch(`/menu/${id}/availability`, { available }),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData: CreateOrderRequest) =>
    api.post<Order>('/orders', orderData),
  
  getUserOrders: () => api.get<Order[]>('/orders/user'),
  
  getOrderById: (id: string) => api.get<Order>(`/orders/${id}`),
  
  // Admin only
  getAllOrders: () => api.get<Order[]>('/orders'),
  
  updateOrderStatus: (id: string, status: Order['status']) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// User API calls
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (updates: Partial<{ name: string; phone: string }>) =>
    api.put('/user/profile', updates),
};

export default api;