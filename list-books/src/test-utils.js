// test-utils.jsx
import React from 'react';
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// Import your own reducer
import  rootReducer  from './store/store';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { user: rootReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper() {
    return <Provider store={store}></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }