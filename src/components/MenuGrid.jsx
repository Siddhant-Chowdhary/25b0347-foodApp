import { Search } from 'lucide-react';
import FoodCard from './FoodCard';
import { motion } from 'framer-motion';

export default function MenuGrid({ items, onAdd, searchQuery, setSearchQuery }) {
  return (
    <div className="w-full space-y-6">
      <div className="relative max-w-md mx-auto mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          placeholder="Search for food..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No items found matching your search.</div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {items.map((item) => (
            <FoodCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
