import {createStore ,combineReducers} from 'redux';

import {ListBooks,} from './Books/books.reducer';
import {FavoritesIconRedux} from './Favorites/Id/favoritesId.reducer';
import { FavoritesBooksRedux } from './Favorites/Books/favoritesBooks.reducer'; 

export const rootReducer = combineReducers(Object.assign({
    books : ListBooks,
    favoritesIcons:FavoritesIconRedux,
    favoritesBooks:FavoritesBooksRedux
}))

 const store = createStore(rootReducer)

 export default store;