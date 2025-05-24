import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <motion.div
        className="w-16 h-16 border-4 border-gray-200 rounded-full"
        style={{ borderTopColor: '#4F46E5' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;