/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react'
import { getVivoSkin, ThemeContextProvider } from '@telefonica/mistica';
import { waitFor } from '@testing-library/dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockBooksApi } from '../../___mocks___/mockBooksApi';
import { getBooksApi } from '../../Services/api';

import store from '../../store/store';
import Home from './index';

describe('list books page', () => {

  it("render page", async () => {

  jest.spyOn(getBooksApi, "data").mockImplementation(() => Promise.resolve(mockBooksApi))

    const { debug } = render(
      <ThemeContextProvider
        theme={{ skin: getVivoSkin(), i18n: { locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR' } }}>
        <MemoryRouter>
          <Provider store={store}>
            <Home />
          </Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      debug()
      expect(screen.getByText(/teste/i)).toBeInTheDocument()

    }, { timeout: 4000 })

  })

})

// 2: Aparecer os livros da primeira página.
// 3: Aparecer os livros de acordo com o que foi  digitado na busca.
// 4: Ao clicar em um livro ser redirecionado para página de detalhes.