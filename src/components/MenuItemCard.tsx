import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem, items, updateQuantity } = useCart();
  const { user } = useAuth();
  
  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    if (!item.available) {
      toast.error('This item is currently unavailable');
      return;
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    
    toast.success(`${item.name} added to cart`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      breakfast: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300',
      lunch: 'bg-green-500/10 text-green-700 dark:text-green-300',
      snacks: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      beverages: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-700';
  };

  return (
    <Card className="group hover:shadow-glow transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Unavailable</Badge>
          </div>
        )}
        <Badge className={`absolute top-2 right-2 ${getCategoryColor(item.category)}`}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
          {item.ingredients && (
            <span className="text-xs text-muted-foreground">
              {item.ingredients.slice(0, 2).join(', ')}
              {item.ingredients.length > 2 && '...'}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {user ? (
          quantity > 0 ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!item.available}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium px-3">{quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!item.available}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="font-semibold text-sm">
                ${(item.price * quantity).toFixed(2)}
              </span>
            </div>
          ) : (
            <Button
              className="w-full bg-gradient-primary hover:shadow-glow"
              onClick={handleAddToCart}
              disabled={!item.available}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )
        ) : (
          <Button className="w-full" variant="outline" disabled>
            Login to Order
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;