import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clock, CheckCircle, Utensils, Truck, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/services/api';
import { toast } from 'sonner';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const newOrderId = searchParams.get('new');

  // Mock orders data - replace with actual API call
  const mockOrders: Order[] = [
    {
      id: 'ORD-1703123456',
      userId: '1',
      items: [
        { menuItemId: '1', quantity: 1, price: 12.99 },
        { menuItemId: '3', quantity: 2, price: 4.99 },
      ],
      totalAmount: 22.97,
      status: 'preparing',
      createdAt: new Date().toISOString(),
      estimatedTime: 15,
    },
    {
      id: 'ORD-1703023456',
      userId: '1',
      items: [
        { menuItemId: '2', quantity: 1, price: 8.99 },
        { menuItemId: '7', quantity: 1, price: 3.99 },
      ],
      totalAmount: 12.98,
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
      id: 'ORD-1702923456',
      userId: '1',
      items: [
        { menuItemId: '4', quantity: 3, price: 3.99 },
      ],
      totalAmount: 11.97,
      status: 'ready',
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ];

  // Mock menu items for display
  const mockMenuItems = {
    '1': { name: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03246963d51b?w=100&h=100&fit=crop' },
    '2': { name: 'Avocado Toast', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=100&h=100&fit=crop' },
    '3': { name: 'Fresh Orange Juice', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=100&h=100&fit=crop' },
    '4': { name: 'Chocolate Croissant', image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=100&h=100&fit=crop' },
    '7': { name: 'Iced Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop' },
  };

  useEffect(() => {
    if (newOrderId) {
      toast.success('Order placed successfully!', {
        description: `Order ID: ${newOrderId}`,
      });
    }
  }, [newOrderId]);

  useEffect(() => {
    const loadOrders = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call: const response = await orderAPI.getUserOrders();
        setTimeout(() => {
          setOrders(mockOrders);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to load orders:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      loadOrders();
    }
  }, [user]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Utensils className="h-4 w-4" />;
      case 'ready':
        return <AlertCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300';
      case 'preparing':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-300';
      case 'ready':
        return 'bg-green-500/10 text-green-700 dark:text-green-300';
      case 'completed':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Order Received';
      case 'preparing':
        return 'Being Prepared';
      case 'ready':
        return 'Ready for Pickup';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              Please login to view your order history
            </p>
            <Button className="bg-gradient-primary">Login to Continue</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track your current orders and view your order history
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Truck className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Browse our menu to get started!
              </p>
              <Button className="bg-gradient-primary">Browse Menu</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusText(order.status)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => {
                        const menuItem = mockMenuItems[item.menuItemId as keyof typeof mockMenuItems];
                        return (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={menuItem?.image || '/placeholder.svg'}
                              alt={menuItem?.name || 'Menu Item'}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <p className="font-medium">{menuItem?.name || 'Unknown Item'}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <span className="font-medium">
                              ${(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold">Total: ${order.totalAmount.toFixed(2)}</p>
                        {order.estimatedTime && order.status === 'preparing' && (
                          <p className="text-sm text-muted-foreground">
                            Estimated time: {order.estimatedTime} minutes
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {order.status === 'ready' && (
                          <Button size="sm" className="bg-accent hover:bg-accent/90">
                            Mark as Picked Up
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <div className="pt-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>Order Received</span>
                          <span>Preparing</span>
                          <span>Ready</span>
                          <span>Complete</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                            style={{
                              width: 
                                order.status === 'pending' ? '25%' :
                                order.status === 'preparing' ? '50%' :
                                order.status === 'ready' ? '75%' : '100%'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;