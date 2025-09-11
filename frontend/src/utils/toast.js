import useToastStore from '../store/toastStore';

const useToast = () => {
  const showToast = useToastStore((state) => state.showToast);
  const dismissToast = useToastStore((state) => state.dismissToast);

  const showSuccess = (message) => {
    return showToast(message, 'success');
  };

  const showError = (message) => {
    return showToast(message, 'error');
  };

  const showVerificationCode = (email, code) => {
    const message = `VERIFICATION CODE for ${email}: ${code}`;
    return showToast(message, 'success');
  };

  const showWelcomeMessage = (email) => {
    const message = `WELCOME EMAIL would be sent to: ${email}`;
    return showToast(message, 'success');
  };

  return {
    showSuccess,
    showError,
    showVerificationCode,
    showWelcomeMessage,
    dismissToast,
  };
};

export default useToast;
