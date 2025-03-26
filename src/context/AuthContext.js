import { createContext, useReducer, useEffect } from 'react';
import { useLogout } from '../hooks/useLogout';

export const AuthContext = createContext();

const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  let timer;

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    window.location.href = '/login'; // Redirect to login
  };

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();

      // removing existing event listener
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      const logout = () => {
        dispatch({
          type: 'LOGOUT',
        });

        localStorage.removeItem('token');
      };
      logout();
    }, 3000000);
  };

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));

    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }

    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
