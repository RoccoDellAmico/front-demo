// si no aclaro la ruta, por default va a public
import Navbar from '../components/Navbar/Navbar';
import React from 'react';

import Filter from '../components/filters/Filter';
const App = () => {
  return (
    <div>
      <Filter />
      <Navbar />
    </div>
  );
}

export default App
