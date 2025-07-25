import { toast } from 'react-toastify';

const useToast = () => {
  const defaultOptions = {
    autoClose: 5000,
    position: toast.POSITION.BOTTOM_CENTER,
    hideProgressBar: true,
    closeOnClick: true,

    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      ...defaultOptions,
    });
  };

  const showWarningToast = (message) => {
    toast.warning(message, {
      ...defaultOptions,
    });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      ...defaultOptions,
    });
  };

  return {
    showSuccessToast,
    showWarningToast,
    showErrorToast,
  };
};

export default useToast;
