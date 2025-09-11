import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useToastStore from '../store/toastStore';
import { CustomToast } from './CustomToast';

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastStore();

  // Limit the number of visible toasts to prevent overflow
  const visibleToasts = toasts.slice(0, 3);
  const hiddenCount = toasts.length - visibleToasts.length;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-3 w-full max-w-xs sm:max-w-sm">
      {hiddenCount > 0 && (
        <div className="text-xs text-gray-500 text-right pr-2">
          +{hiddenCount} more notification{hiddenCount > 1 ? 's' : ''}
        </div>
      )}
      <AnimatePresence>
        {visibleToasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { 
                type: 'spring',
                damping: 25,
                stiffness: 300,
                delay: index * 0.05 // Stagger the animations
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9,
              transition: { 
                duration: 0.2,
                ease: 'easeInOut'
              } 
            }}
            className="w-full"
          >
            <CustomToast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onDismiss={dismissToast}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
