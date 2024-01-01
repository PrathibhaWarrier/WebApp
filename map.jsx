import React, { useState } from 'react';

const MultiDropdown = () => {
  // State to manage selected values for each dropdown
  const [selectedValues, setSelectedValues] = useState({
    dropdown1: '',
    dropdown2: '',
    dropdown3: '',
    dropdown4: '',
    dropdown5: '',
  });

  // Array to represent the columns in each dropdown
  const columns = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  // Function to handle dropdown selection
  const handleDropdownChange = (dropdownName, selectedValue) => {
    setSelectedValues({
      ...selectedValues,
      [dropdownName]: selectedValue,
    });
  };

  return (
    <div>
      {/* Render 5 dropdowns */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          {/* Dropdown label */}
          <label htmlFor={`dropdown${index + 1}`}>{`Dropdown ${index + 1}: `}</label>

          {/* Dropdown component */}
          <select
            id={`dropdown${index + 1}`}
            value={selectedValues[`dropdown${index + 1}`]}
            onChange={(e) => handleDropdownChange(`dropdown${index + 1}`, e.target.value)}
          >
            {/* Map through columns to create options */}
            {columns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>
                {column}
              </option>
            ))}
          </select>

          {/* Display selected value */}
          <p>Selected Value: {selectedValues[`dropdown${index + 1}`]}</p>
        </div>
      ))}
    </div>
  );
};

export default MultiDropdown;
