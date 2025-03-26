import axios from 'axios';
export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});
export const setHeadersFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};
instance.interceptors.request.use(
  (config) => {
    setHeadersFromLocalStorage();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
const apiService = {
  get: async (url) => {
    try {
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  post: async (url, data) => {
    try {
      const response = await instance.post(url, data);
      console.log(response, '1');
      return response.data;
    } catch (error) {
      console.log(error, '2');
      throw error;
    }
  },
  postFormData: async (url, formData) => {
    instance.defaults.headers.common['Content-Type'] = `multipart/form-data`;
    try {
      const response = await instance.patch(url, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  patch: async (url, data) => {
    try {
      const response = await instance.patch(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  delete: async (url) => {
    try {
      const response = await instance.delete(url);
      return { success: true };
    } catch (error) {
      throw error;
    }
  },
};
export default apiService;
