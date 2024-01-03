// App.js
import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import Table from './components/Table';

const App = () => {
  const [selectedPlant, setSelectedPlant] = useState('');

  const handleSelect = (plant) => {
    setSelectedPlant(plant);
  };

  return (
    <div>
      <h1>Capacity Planning</h1>
      <Dropdown onSelect={handleSelect} />
      <Table selectedPlant={selectedPlant} />
    </div>
  );
};

export default App;
