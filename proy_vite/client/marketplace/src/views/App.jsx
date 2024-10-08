// si no aclaro la ruta, por default va a public
import Navbar from '../components/Navbar/Navbar';
import React from 'react';

import Filter from '../components/filters/Filter';
import CardList from '../components/Card/CardList';
const App = () => {
  return (
    <div>
      <Navbar />
      <Filter />
      <CardList />
    </div>
  );
}

export default App
