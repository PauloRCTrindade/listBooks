import React from 'react';

import {Routes,Route} from 'react-router-dom';

import Home from '../Pages/Home';
import Details from '../Pages/Details';

export default function MainsRoutes () {
  
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details' element={<Details />} />
    </Routes>


  )
};