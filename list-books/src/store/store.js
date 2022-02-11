import {createStore ,combineReducers} from 'redux';

import booksReducer from './books/books.reducer';

const rootReducer = combineReducers({
    books : booksReducer
})

 const store = createStore(rootReducer)

 export default store;