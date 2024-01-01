import React, { useState } from 'react';

const MultiDropdown = () => {
  const [selectedValues, setSelectedValues] = useState({
    dropdown1: '',
    dropdown2: '',
    dropdown3: '',
    dropdown4: '',
    dropdown5: '',
  });

  const columns = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const handleDropdownChange = (dropdownName, selectedValue) => {
    setSelectedValues({
      ...selectedValues,
      [dropdownName]: selectedValue,
    });
  };

  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <label htmlFor={`dropdown${index + 1}`}>{`Dropdown ${index + 1}: `}</label>
          <select
            id={`dropdown${index + 1}`}
            value={selectedValues[`dropdown${index + 1}`]}
            onChange={(e) => handleDropdownChange(`dropdown${index + 1}`, e.target.value)}
          >
            {columns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>
                {column}
              </option>
            ))}
          </select>
          <p>Selected Value: {selectedValues[`dropdown${index + 1}`]}</p>
        </div>
      ))}

      {/* Add CenteredButtons component */}
      <CenteredButtons />
    </div>
  );
};

const CenteredButtons = () => {
  const buttonStyle = {
    margin: '10px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button style={buttonStyle}>Button 1</button>
      <button style={buttonStyle}>Button 2</button>
      <button style={buttonStyle}>Button 3</button>
    </div>
  );
};

export default MultiDropdown;
