import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CONSTANTS from './constants';
import { generateGetQuery } from './helpers';

const navigateToLogin = () => {
  localStorage.clear();
  window.location.href = '/login';
};

// Enhanced toast function to display error messages and handle session expiration
const showErrorToast = (error, options = {}) => {
  let errorMessage = 'An error occurred';

  if (error && error?.message) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  // Check if the error indicates an expired session
  if (errorMessage.includes('expired') || errorMessage.includes('token')) {
    errorMessage = 'Your session has expired. Please log in again.';
    navigateToLogin();
  }

  toast.error(errorMessage, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    ...options,
  });
};

// Utility function to handle responses consistently
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'An unexpected error has occurred. Please try again later.');
  }
  if (data?.success === false || data?.error) {
    throw new Error(
      data.message || data.msg || 'An unexpected error has occurred. Please try again later.',
    );
  }
  return data;
};

// GET request function
export const get = async (url, filters = {}) => {
  url = generateGetQuery(url, filters);
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// POST request function
export const post = async (url, _body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(_body),
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// POST request with form data
export const postWithFormData = async (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body,
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// POST request for file import
export const postImportFile = async (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.ImportApi + url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body,
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// PATCH request function
export const patch = async (url, _body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(_body),
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// PATCH request with form data
export const patchWithFormData = async (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body,
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// PUT request function
export const put = async (url, _body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(_body),
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// PUT request with form data
export const putWithFormData = async (url, body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body,
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// DELETE request function
export const Delete = async (url, id) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + (url.endsWith('/') ? url : url + '/') + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};

// POST request without token (for public endpoints)
export const postWithoutToken = async (url, _body) => {
  return new Promise((resolve, reject) => {
    fetch(CONSTANTS.api + url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_body),
    })
      .then(handleResponse)
      .then(resolve)
      .catch((error) => {
        showErrorToast(error);
        reject(error);
      });
  });
};
