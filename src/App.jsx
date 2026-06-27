import { useState, useEffect, useMemo } from 'react';
import MenuGrid from './components/MenuGrid';
import CartSidebar from './components/CartSidebar';
import { Moon, Sun, ShoppingBag } from 'lucide-react';

const DUMMY_DATA = [
  { id: 1, name: 'Pepperoni Pizza', price: 12.99, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80' },
  { id: 2, name: 'Cheeseburger', price: 8.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
  { id: 3, name: 'Spicy Noodles', price: 10.50, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80' },
  { id: 4, name: 'Caesar Salad', price: 7.50, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { id: 5, name: 'Sushi Roll', price: 14.00, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80' },
  { id: 6, name: 'Chocolate Cake', price: 6.00, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' },
];

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('food-hub-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('food-hub-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const filteredData = useMemo(() => {
    return DUMMY_DATA.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">🍽️ Mini Food Hub</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition flex items-center"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <MenuGrid 
          items={filteredData} 
          onAdd={addToCart} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
}
