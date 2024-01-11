// BopFilter.js

// ... (other imports)

function BopFilter(props) {
  // ... (other code)

  // Updated state variables to store selected values for each filter
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");
  // ... (other state variables)

  // Updated state variables to store available options for each filter
  const [availableTechnology, setAvailableTechnology] = useState(props.technology);
  // ... (other state variables)

  // ... (other code)

  const filterPlantCallback = (selPlant) => {
    setSelectedPlant(selPlant.val);

    // Update available options for dependent filters
    // Example: Update technology options based on the selected plant
    const filteredTechnology = props.technology.filter(
      (tech) => tech.plant === selPlant.val
    );
    setAvailableTechnology(filteredTechnology);

    // ... (update other dependent filters)

    // Call the callback to notify the parent component about the filter change
    filterTechnologyCallback({ val: "", options: filteredTechnology });
  };

  // ... (other filter callback functions)

  const technologyOptions = availableTechnology.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterTechnologyCallback({ val });
        setSelectedTechnology(val);
      }}
    >
      {val}
    </DropdownItem>
  ));

  // ... (other dropdown options)

  return (
    <>
      {/* ... (other code) */}
      <div className="dropdown1">
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button" className="Plant">
            Plant
          </DropdownToggle>
          <DropdownMenu>{plantOptions}</DropdownMenu>
        </UncontrolledDropdown>
        <input type="text" className="customTextBox" value={selectedPlant} readOnly />

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button" className="Tech">
            Technology
          </DropdownToggle>
          <DropdownMenu>{technologyOptions}</DropdownMenu>
        </UncontrolledDropdown>
        <input type="text" className="customTextBox" value={selectedTechnology} readOnly />

        {/* ... (other dropdowns) */}
      </div>
      {/* ... (other code) */}
    </>
  );
}

export default BopFilter;
/////////////////////////////////////


// UserProfile.js
import React, { useState, useEffect } from "react";
import './barcodecss.css'; 
import LogoButton from './LogoButton';

import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

function BopFilter(props) {
  const {
    plant,
    technology,
    mainValving,
    rod,
    pt,
    ga,
    plt_txt,
    pg_txt,
    ml,
    pl,
    filterPlantCallback,
    filterTechnologyCallback,
    filterMainValvingCallback,
    filterRodCallback,
    filterPTCallback,
    filterGlobalAccountCallback,
    filterPlatformTextCallback,
    filterProgramTextCallback,
    filterMountingLocationCallback,
    filterProgramClassificationCallback,
  } = props;

  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedMainValving, setSelectedMainValving] = useState("");
  const [selectedRod, setSelectedRod] = useState("");
  const [selectedPT, setSelectedPT] = useState("");
  const [selectedGlobalAccount, setSelectedGlobalAccount] = useState([]);
  const [selectedPlatformText, setSelectedPlatformText] = useState([]);
  const [selectedProgramText, setSelectedProgramText] = useState([]);
  const [selectedMountingLocation, setSelectedMountingLocation] = useState([]);
  const [selectedProgramClassification, setSelectedProgramClassification] = useState([]);

  const [availableTechnology, setAvailableTechnology] = useState(technology);
  // Add similar state variables for other dependent filters

  // Effect to update available options when plant changes
  useEffect(() => {
    const filteredTechnology = technology.filter(
      (tech) => tech.plant === selectedPlant
    );
    setAvailableTechnology(filteredTechnology);
    filterTechnologyCallback({ val: "", options: filteredTechnology });
  }, [selectedPlant, technology, filterTechnologyCallback]);

  // Similar effects for other dependent filters

  const plantOptions = plant.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterPlantCallback({ val });
        setSelectedPlant(val);
      }}
    >
      {val}
    </DropdownItem>
  ));

  const technologyOptions = availableTechnology.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        filterTechnologyCallback({ val });
        setSelectedTechnology(val);
      }}
    >
      {val}
    </DropdownItem>
  ));

  // Add similar options for other dependent filters

  return (
    <>
      <div className="MyDropdown">
        <div>
          <LogoButton to="/admin/BopTemplate" alt="Logo Alt Text" className="your-logo-button" />
        </div>
        <div>
          <LogoButton to="/admin/salesforce" alt="Logo Alt Text" className="your-logo-button" />
        </div>
        <div>
          <LogoButton to="/admin/CapacityPlanning" alt="Logo Alt Text" className="your-logo-button" />
        </div>
        <div>
          <LogoButton to="/admin/Cap" alt="Logo Alt Text" className="your-logo-button" />
        </div>
      </div>
      
      <div className="dropdown1">
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button"className="Plant">
            Plant
          </DropdownToggle>
          <DropdownMenu>{plantOptions}</DropdownMenu>
        </UncontrolledDropdown>
        <input type="text" className="customTextBox" value={selectedPlant} readOnly />

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button" className="Tech">
            Technology
          </DropdownToggle>
          <DropdownMenu>{technologyOptions}</DropdownMenu>
        </UncontrolledDropdown>
        <input type="text" className="customTextBox" value={selectedTechnology} readOnly />

        {/* Add similar blocks for other dependent filters */}
      </div>

      {/* Add similar blocks for other filter categories */}
    </>
  );
}

export default BopFilter;
