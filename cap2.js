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
  const [availableMainValving, setAvailableMainValving] = useState(mainValving);
  // Add similar state variables for other dependent filters

  // Effect to update available options when plant changes
  useEffect(() => {
    const filteredTechnology = technology.filter(
      (tech) => tech.plant === selectedPlant
    );
    setAvailableTechnology(filteredTechnology);
    filterTechnologyCallback({ val: "", options: filteredTechnology });
  }, [selectedPlant, technology, filterTechnologyCallback]);

  // Effect to update available options when technology changes
  useEffect(() => {
    const filteredMainValving = mainValving.filter(
      (mv) => mv.technology === selectedTechnology
    );
    setAvailableMainValving(filteredMainValving);
    filterMainValvingCallback({ val: "", options: filteredMainValving });
  }, [selectedTechnology, mainValving, filterMainValvingCallback]);

  // Add similar effects for other dependent filters

  const plantOptions = plant.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
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
        setSelectedTechnology(val);
      }}
    >
      {val}
    </DropdownItem>
  ));

  const mainValvingOptions = availableMainValving.map((val) => (
    <DropdownItem
      key={val}
      href="#pablo"
      onClick={(e) => {
        e.preventDefault();
        setSelectedMainValving(val);
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

        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" type="button" className="MV">
            Main Valving
          </DropdownToggle>
          <DropdownMenu>{mainValvingOptions}</DropdownMenu>
        </UncontrolledDropdown>
        <input type="text" className="customTextBox" value={selectedMainValving} readOnly />

        {/* Add similar blocks for other dependent filters */}
      </div>

      {/* Add similar blocks for other filter categories */}
    </>
  );
}

export default BopFilter;
