/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react'
import { getVivoSkin, ThemeContextProvider } from '@telefonica/mistica';
import { fireEvent, waitFor } from '@testing-library/dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockBooksApi } from '../../___mocks___/mockBooksApi';
import { getBooksApi } from '../../Services/api';

import store from '../../store/store';
import Home from './index';
import Details from '../Details';



describe('list books details', () => {

  // em desenvolvimento

  jest.mock('react-router-dom', () => {
    return {
      useParams: () => ({
        id: '1'
      })
    }
  }) 

  it("should show deatails books", async () => {    

    const { debug } = render(
      <ThemeContextProvider
        theme={{ skin: getVivoSkin(), i18n: { locale: 'pt-BR', phoneNumberFormattingRegionCode: 'BR' } }}>
        <MemoryRouter>
          <Provider store={store}>
            <Details />
          </Provider>
        </MemoryRouter>
      </ThemeContextProvider>
    )

    await waitFor(() => {
      debug()
      expect(screen.getByText(/The Declaration of Independence of the United States of America/i)).toBeInTheDocument()

    }, { timeout: 3000 })

  })
})

describe('details by clicking on the book', () => {
  it("should show book clicked", async () => {

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
      setTimeout(() => {

        fireEvent.change(screen.getByTestId('input'), { target: { value: 'pride' } })

      }, 500)
      expect(screen.getByText(/Great Hike; or, The Pride of the Khaki Troop/i)).toBeInTheDocument()

    }, { timeout: 4000 })

  })
})

describe('list books page 01', () => {

  it("should show all books on the first page", async () => {

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

      expect(screen.getByText(/book 01/i)).toBeInTheDocument()

    }, { timeout: 3000 })

    // debug()
  })

})

// 2: Aparecer os livros da primeira página.
// 3: Aparecer os livros de acordo com o que foi  digitado na busca.
// 4: Ao clicar em um livro ser redirecionado para página de detalhes.