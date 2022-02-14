/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import Home from './index';

import { screen, userEvent, render } from '../../test-utils'
import { Provider } from 'react-redux';


describe('Test list Books component', () => {
  it('reder component', () => {
    const { getByPlaceholderText } = render(
      <Provider>
        <Home />
      </Provider>);
    const input = getByPlaceholderText("Digite sua Busca");

  })
})

// 1: Aparecer componeentes de Header, Busca, e footer.
// 2: Aparecer os livros da primeira página.
// 3: Aparecer os livros de acordo com o que foi  digitado na busca.
// 4: Ao clicar em um livro ser redirecionado para página de detalhes.