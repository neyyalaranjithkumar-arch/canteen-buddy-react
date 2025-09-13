import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/MenuItemCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MenuItem } from '@/services/api';

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock menu data - replace with actual API call
  const mockMenuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and exotic spices',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d51b?w=400&h=300&fit=crop',
      category: 'lunch',
      available: true,
      ingredients: ['Chicken', 'Basmati Rice', 'Spices', 'Yogurt']
    },
    {
      id: '2',
      name: 'Avocado Toast',
      description: 'Fresh sourdough bread topped with creamy avocado and seeds',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
      category: 'breakfast',
      available: true,
      ingredients: ['Sourdough', 'Avocado', 'Seeds', 'Lime']
    },
    {
      id: '3',
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice packed with vitamin C',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
      category: 'beverages',
      available: true,
      ingredients: ['Fresh Oranges']
    },
    {
      id: '4',
      name: 'Chocolate Croissant',
      description: 'Buttery croissant filled with rich dark chocolate',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400&h=300&fit=crop',
      category: 'snacks',
      available: true,
      ingredients: ['Butter', 'Flour', 'Dark Chocolate']
    },
    {
      id: '5',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese and croutons',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
      category: 'lunch',
      available: true,
      ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing']
    },
    {
      id: '6',
      name: 'Pancakes',
      description: 'Fluffy pancakes served with maple syrup and butter',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      category: 'breakfast',
      available: false,
      ingredients: ['Flour', 'Eggs', 'Milk', 'Maple Syrup']
    },
    {
      id: '7',
      name: 'Iced Coffee',
      description: 'Premium cold brew coffee served over ice',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      category: 'beverages',
      available: true,
      ingredients: ['Coffee Beans', 'Ice', 'Milk']
    },
    {
      id: '8',
      name: 'Fruit Salad',
      description: 'Fresh seasonal fruits mixed with honey dressing',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400&h=300&fit=crop',
      category: 'snacks',
      available: true,
      ingredients: ['Mixed Fruits', 'Honey', 'Mint']
    },
  ];

  useEffect(() => {
    // Simulate API call
    const loadMenuItems = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call: const response = await menuAPI.getMenuItems();
        setTimeout(() => {
          setMenuItems(mockMenuItems);
          setFilteredItems(mockMenuItems);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to load menu items:', error);
        setIsLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  useEffect(() => {
    let filtered = menuItems;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Items', count: menuItems.length },
    { id: 'breakfast', label: 'Breakfast', count: menuItems.filter(item => item.category === 'breakfast').length },
    { id: 'lunch', label: 'Lunch', count: menuItems.filter(item => item.category === 'lunch').length },
    { id: 'snacks', label: 'Snacks', count: menuItems.filter(item => item.category === 'snacks').length },
    { id: 'beverages', label: 'Beverages', count: menuItems.filter(item => item.category === 'beverages').length },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading delicious menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our selection of fresh, delicious meals prepared daily by our expert chefs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredItems.length} items found
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs sm:text-sm">
                {category.label}
                <span className="ml-1 text-xs opacity-60">({category.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory}>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse different categories
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Menu;