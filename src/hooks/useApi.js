import { useState } from 'react';
import { api } from '../services/api';
import { useAuthContext } from './useAuthContext';
import useToast from './useToast';

const useApi = () => {
  const { showErrorToast } = useToast();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (url, method = 'get', data = null) => {
    setLoading(true);
    try {
      const response = await api({
        method,
        url,
        data,
        headers: {
          Authorization: user?.data?.token ? `Bearer ${user?.data?.token}` : undefined,
        },
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response ? error?.response?.data : 'Something went wrong');
      showErrorToast(error.response ? error?.response?.data?.message : 'Something went wrong');
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { loading, error, apiCall, clearError };
};

export default useApi;
