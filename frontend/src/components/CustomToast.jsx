import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, X, Clock } from 'lucide-react';

export const CustomToast = ({ id, message, type = 'info', onDismiss }) => {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  const isVerificationCode = message.includes('VERIFICATION CODE');
  const codeMatch = message.match(/VERIFICATION CODE for [^:]+: (\d+)/);
  const verificationCode = codeMatch ? codeMatch[1] : null;
  const email = message.match(/for (.+?):/)?.[1] || '';

  const copyToClipboard = () => {
    if (verificationCode) {
      navigator.clipboard.writeText(verificationCode);
      // You could show a "Copied!" message here if needed
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`relative flex items-start justify-between w-full max-w-xs sm:max-w-md p-4 mb-2 rounded-xl shadow-lg border ${
        type === 'success' 
          ? 'bg-green-50 border-green-200 text-green-800' 
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}
    >
      <div className='flex items-start flex-1 min-w-0'>
        <div className={`flex-shrink-0 mt-0.5 ${
          type === 'success' ? 'text-green-500' : 'text-blue-500'
        }`}>
          <Check size={20} />
        </div>
        <div className='ml-3 overflow-hidden'>
          <p className='text-sm font-semibold truncate'>
            {isVerificationCode ? 'Verification Code' : 'Welcome'}
          </p>
          <div className='mt-1 text-sm'>
            {isVerificationCode ? (
              <div>
                <p className='truncate'>Verification code for {email}</p>
                <div className='flex items-center mt-2'>
                  <span className='px-3 py-2 font-mono text-lg font-bold bg-white rounded-lg border border-gray-200'>
                    {verificationCode}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className='flex items-center justify-center w-9 h-9 ml-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 active:bg-gray-200'
                    title='Copy to clipboard'
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <p className='mt-1 text-xs text-gray-500'>
                  Code expires in 24 hours
                </p>
              </div>
            ) : (
              <div className='space-y-1'>
                <p>Welcome to our platform!</p>
                <p className='text-xs text-gray-600'>
                  Check your email for a verification code to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className='flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500 transition-colors'
        aria-label='Close'
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};
