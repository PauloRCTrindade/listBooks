import React from 'react';
import { Provider } from 'react-redux';

import store from './store/store';
import {
  getVivoSkin,
  ThemeContextProvider
} from '@telefonica/mistica'

import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';

ReactDOM.render(
  <ThemeContextProvider
    theme={{ skin: getVivoSkin(), i18n: { locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR' } }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeContextProvider>,
  document.getElementById('root')
);
