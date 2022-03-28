import React from 'react';

import {Routes,Route} from 'react-router-dom';

import Home from '../Pages/Home';
import Details from '../Pages/Details';
import FavoritesBooks from '../Pages/FavotitesBooks';

export default function MainsRoutes () {
  
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='/favoritesBooks' element={< FavoritesBooks />} />
    </Routes>


  )
};