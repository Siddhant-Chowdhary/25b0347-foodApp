import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FoodCard({ item, onAdd }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
            ${item.price.toFixed(2)}
          </p>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAdd(item)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus size={18} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
