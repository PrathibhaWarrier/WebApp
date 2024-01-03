// components/Table.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Table = ({ selectedPlant }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/capacity-planning/?plant=${selectedPlant}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedPlant) {
      fetchData();
    }
  }, [selectedPlant]);

  return (
    <table>
      <thead>
        <tr>
          {/* Add table headers based on your model fields */}
          <th>Column 1</th>
          <th>Column 2</th>
          {/* ... */}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {/* Display data based on your model fields */}
            <td>{item.field1}</td>
            <td>{item.field2}</td>
            {/* ... */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
