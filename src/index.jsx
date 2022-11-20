import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { App } from './App';
import CssBaseline from '@mui/material/CssBaseline';
import './index.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);
