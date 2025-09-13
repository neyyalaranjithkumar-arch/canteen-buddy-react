import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Clock,
      title: 'Quick Ordering',
      description: 'Order your favorite meals in seconds with our intuitive interface.',
    },
    {
      icon: Star,
      title: 'Quality Food',
      description: 'Fresh, delicious meals prepared by our expert chefs daily.',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Safe and secure payment processing for your peace of mind.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Smart Canteen
                <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                  Ordering Made Simple
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Skip the lines, order ahead, and enjoy fresh meals from our canteen. 
                Fast, convenient, and delicious.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/menu">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                      Order Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/menu">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Browse Menu
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Smart Canteen?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of canteen ordering with our innovative platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Items Preview */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Today's Special
            </h2>
            <p className="text-lg text-muted-foreground">
              Check out our most popular items
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Chicken Biryani',
                price: 12.99,
                image: 'https://images.unsplash.com/photo-1563379091339-03246963d51b?w=400&h=300&fit=crop',
                category: 'lunch'
              },
              {
                name: 'Fresh Juice',
                price: 4.99,
                image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
                category: 'beverages'
              },
              {
                name: 'Chocolate Croissant',
                price: 3.99,
                image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400&h=300&fit=crop',
                category: 'breakfast'
              },
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${item.price}</span>
                    <span className="text-sm text-muted-foreground capitalize">{item.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Order?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust Smart Canteen for their daily meals
          </p>
          {!user && (
            <Link to="/login">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;