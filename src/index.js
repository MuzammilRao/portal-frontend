import 'react-toastify/dist/ReactToastify.css';
import 'react-multi-email/dist/style.css';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { InvoiceContextProvider } from './context/InvoiceContext';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    brand: {
      primary: '#101010',
      secondary: '#333333',
      text: '#fff',
      lightText: 'rgba(255, 255, 255, 0.8)',
      bg: '#fff',
      themeGray: '#F9F9F9',
      themeOrange: '#F04E23',
      themeWhite: '#fff',
    },
  },
});

root.render(
  <>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <AuthContextProvider>
          <InvoiceContextProvider>
            <App />
            <ToastContainer />
          </InvoiceContextProvider>
        </AuthContextProvider>
      </Provider>
    </ChakraProvider>
  </>,
);
