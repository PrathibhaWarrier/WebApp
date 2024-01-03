// components/Dropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = ({ onSelect }) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/capacity-planning/')
      .then(response => {
        const uniquePlants = [...new Set(response.data.map(item => item.plant))];
        setPlants(uniquePlants);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a Plant</option>
      {plants.map(plant => (
        <option key={plant} value={plant}>
          {plant}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
