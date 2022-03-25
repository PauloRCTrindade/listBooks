import {createStore ,combineReducers} from 'redux';

import {ListReducers} from './Books/books.reducer';

export const rootReducer = combineReducers(Object.assign({
    books : ListReducers,
}))

 const store = createStore(rootReducer)

 export default store;