import {createStore ,combineReducers} from 'redux';

import booksReducer from './Books/books.reducer';

const rootReducer = combineReducers({
    books : booksReducer
})

 const store = createStore(rootReducer)

 export default store;