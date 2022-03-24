import {createStore ,combineReducers} from 'redux';

import {ListReducers} from './Books/books.reducer';
import {Favorites} from './Favorites/favorites.reducer';

export const rootReducer = combineReducers(Object.assign({
    books : ListReducers,
    favorites: Favorites
}))

 const store = createStore(rootReducer)

 export default store;