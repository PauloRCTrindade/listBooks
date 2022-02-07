import React from 'react';

import { getVivoSkin, ThemeContextProvider} from '@telefonica/mistica'

import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';

ReactDOM.render(
  <ThemeContextProvider
    theme={{skin: getVivoSkin(), i18n: {locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR'}}}
  >
    <App />
  </ThemeContextProvider>,
  document.getElementById('root')
);
