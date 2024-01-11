// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./barcodecss.css";
import CapFilter from "./CapFilter.js";
import LogoButton from './LogoButton';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function Tables() {
  // State variables for selected values, table data, and unique options
  const initialSelVals = {
    sel1GlobalAcc: "",
    sel1Platform: "",
    sel1Program: "",
    sel1Mounting: "",
  };
  const [selVals, setSelVals] = useState(initialSelVals);
  const [tbdata, setTbdata] = useState([]);
  const [basedata, setBasedata] = useState([]);
  const [err, setErr] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unqPlant, setUnqPlant] = useState([]);
  const [unqTechnology, setUnqTechnology] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState([]);
  const [selectedTechnology, setSelectedTechnology] = useState([]);
  const [unqMainValving, setUnqMainValving] = useState([]);
  const [unqRod, setUnqRod] = useState([]);
  const [unqPT, setUnqPT] = useState([]);
  const [selectedMainValving, setSelectedMainValving] = useState([]);
  const [selectedRod, setSelectedRod] = useState([]);
  const [selectedPT, setSelectedPT] = useState([]);
  const [selectedGlobalAccount, setSelectedGlobalAccount] = useState([]);
  const [selectedPlatformText, setSelectedPlatformText] = useState([]);
  const [selectedProgramText, setSelectedProgramText] = useState([]);
  const [selectedMountingLocation, setSelectedMountingLocation] = useState([]);
  const [selectedProgramClassification, setSelectedProgramClassification] = useState([]);
  const [unqGA, setUnqGlobalAccount] = useState([]);
  const [unqPlatText, setUnqPlatformText] = useState([]);
  const [unqProgText, setUnqProgramText] = useState([]);
  const [unqML, setUnqMountingLocation] = useState([]);
  const [unqPCL, setUnqProgramClassification] = useState([]);
  const [unqTechnology2, setUnqTechnology2] = useState([]);
  const [selectedTechnology2, setSelectedTechnology2] = useState([]);
  const [selectedMainValving2, setSelectedMainValving2] = useState([]);
  const [selectedRod2, setSelectedRod2] = useState([]);
  const [selectedPT2, setSelectedPT2] = useState([]);
  const [unqMainValving2, setUnqMainValving2] = useState([]);
  const [unqRod2, setUnqRod2] = useState([]);
  const [unqPT2, setUnqPT2] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({
    plant: "",
    technology: "",
    mainValving: "",
    rod: "",
    pt: "",
  });

  // Handle checkbox change for processes
  const handleProcessCheckboxChange = (process) => {
    setSelectedProcesses((prevSelected) =>
      prevSelected.includes(process)
        ? prevSelected.filter((p) => p !== process)
        : [...prevSelected, process]
    );
  };

  // Handle checkbox change for dynamic filtering
  const handleCheckboxChange = (index) => {
    setTbdata((prevData) => {
      const newData = [...prevData];
      newData[index].stationCheck1 = !newData[index].stationCheck1;

      // Set CT to null only for the row where the checkbox is checked
      if (newData[index].stationCheck1) {
        // Store the original CT value before setting it to null
        newData[index].originalCT = newData[index].CT;
        newData[index].CT = null;
      } else {
        // Retrieve the original CT value when the checkbox is unchecked
        newData[index].CT = newData[index].originalCT;
        // Clear the stored original CT value
        delete newData[index].originalCT;
      }

      return newData;
    });
  };

  // Callback functions for dynamic filtering
  const filterPlantCallback = (selPlant) => {
    setSelectedPlant(selPlant.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, plant: selPlant.val }));
  };

  const filterMainValvingCallback = (selMainValving) => {
    setSelectedMainValving2(selMainValving.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, mainValving: selMainValving.val }));
  };

  const filterRodCallback = (selRod) => {
    setSelectedRod2(selRod.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, rod: selRod.val }));
  };

  const filterPTCallback = (selPT) => {
    setSelectedPT2(selPT.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, pt: selPT.val }));
  };

  const filterTechnologyCallback = (selTechnology) => {
    setSelectedTechnology2(selTechnology.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, technology: selTechnology.val }));
  };

  const filterGlobalAccountCallback = (selGlobalAccount) => {
    setSelectedGlobalAccount(selGlobalAccount.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, globalAccount: selGlobalAccount.val }));
  };

  const filterPlatformTextCallback = (selPlatformText) => {
    setSelectedPlatformText(selPlatformText.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, platformText: selPlatformText.val }));
  };

  const filterProgramTextCallback = (selProgramText) => {
    setSelectedProgramText(selProgramText.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, programText: selProgramText.val }));
  };

  const filterMountingLocationCallback = (selMountingLocation) => {
    setSelectedMountingLocation(selMountingLocation.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, mountingLocation: selMountingLocation.val }));
  };

  const filterProgramClassificationCallback = (selProgramClassification) => {
    setSelectedProgramClassification(selProgramClassification.val);
    setSelectedFilter((prevFilters) => ({ ...prevFilters, programClassification: selProgramClassification.val }));
  };

  // Effect to filter data based on selected filter options
  useEffect(() => {
    // Logic to filter based on selected filter options
    let regexGlobalAccount = new RegExp([selectedGlobalAccount], "i");
    let regexPlatformText = new RegExp([selectedPlatformText], "i");
    let regexProgramText = new RegExp([selectedProgramText], "i");
    let regexProgramClassification = new RegExp([selectedProgramClassification], "i");
    let regexMountingLocation = new RegExp([selectedMountingLocation], "i");
    let regexMainValving2 = new RegExp([selectedMainValving2], "i");
    let regexRod2 = new RegExp([selectedRod2], "i");
    let regexPT2 = new RegExp([selectedPT2], "i");
    let regexTechnology2 = new RegExp([selectedTechnology2], "i");
    let regexProcesses2 = new RegExp(selectedProcesses.join("|"), "i");

    setTbdata2(
      basedata.filter((val) => {
        return (
          regexGlobalAccount.test(val.GlobalAccount) &&
          regexPlatformText.test(val.PlatformText) &&
          regexProgramText.test(val.ProgramText) &&
          regexProgramClassification.test(val.ProgramClassification) &&
          regexMountingLocation.test(val.MountingLocation) &&
          regexMainValving2.test(val.MainValving) &&
          regexRod2.test(val.Rod) &&
          regexPT2.test(val.PT) &&
          regexTechnology2.test(val.Technology) &&
          regexProcesses2.test(val.Phase)
        );
      })
    );
  }, [
    selectedGlobalAccount,
    selectedPlatformText,
    selectedProgramText,
    selectedProgramClassification,
    selectedMountingLocation,
    selectedMainValving2,
    selectedRod2,
    selectedPT2,
    selectedTechnology2,
    [selectedProcesses, basedata]
  ]);

  // Effect to fetch data from Salesforce API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/SaleforceApi/SalesforceData/")
      .then((response) => {
        setBasedata2(response.data);
        setTbdata2(response.data);
        setLoading2(false);
        setIsDone2(true);

        // Extract unique options from the fetched data
        let uniqueGlobalAccounts = new Set(response.data.map((val) => val.GlobalAccount));
        let uniquePlatformTexts = new Set(response.data.map((val) => val.PlatformText));
        let uniqueProgramTexts = new Set(response.data.map((val) => val.ProgramText));
        let uniqueMountingLocations = new Set(response.data.map((val) => val.MountingLocation));
        let uniqueProgramClassifications = new Set(response.data.map((val) => val.ProgramClassification));
        let uniqueMainValving2 = new Set(response.data.map((val) => val.MainValving));
        let uniqueRod2 = new Set(response.data.map((val) => val.Rod));
        let uniquePT2 = new Set(response.data.map((val) => val.PT));
        let uniqueTechnologies2 = new Set(response.data.map((val) => val.Technology));

        // Set state variables for unique options
        setUnqGlobalAccount(Array.from(uniqueGlobalAccounts));
        setUnqPlatformText(Array.from(uniquePlatformTexts));
        setUnqProgramText(Array.from(uniqueProgramTexts));
        setUnqMountingLocation(Array.from(uniqueMountingLocations));
        setUnqProgramClassification(Array.from(uniqueProgramClassifications));
        setUnqMainValving2(Array.from(uniqueMainValving2));
        setUnqRod2(Array.from(uniqueRod2));
        setUnqPT2(Array.from(uniquePT2));
        setUnqTechnology2(Array.from(uniqueTechnologies2));
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Effect to filter data based on selected values from CapFilter component
  useEffect(() => {
    let datafilter = basedata2;
    for (const [key, value] of Object.entries(selVals)) {
      if (key === "sel1GlobalAcc" && (value !== "" || value != null)) {
        datafilter = datafilter.filter((val) => val.globalAccount === value);
      } else if (key === "sel1Platform" && (value !== "" || value != null)) {
        datafilter = datafilter.filter((val) => val.platformText === value);
      } else if (key === "sel1Program" && (value !== "" || value != null)) {
        datafilter = datafilter.filter((val) => val.programText === value);
      } else if (key === "sel1Mounting" && (value !== "" || value != null)) {
        datafilter = datafilter.filter((val) => val.mountingLocation === value);
      }
    }
    setTbdata2(datafilter);
  }, [selVals]);

  // Effect to filter data based on selected filter options
  useEffect(() => {
    let regexPlant = new RegExp([selectedPlant], "i");
    let regexMainValving = new RegExp([selectedMainValving2], "i");
    let regexRod = new RegExp([selectedRod2], "i");
    let regexPT = new RegExp([selectedPT2], "i");
    let regexTechnology = new RegExp([selectedTechnology2], "i");
    let regexProcesses = new RegExp(selectedProcesses.join("|"), "i");

    setTbdata(
      basedata.filter((val) => {
        return (
          regexPlant.test(val.Plant) &&
          regexMainValving.test(val.MainValving) &&
          regexRod.test(val.Rod) &&
          regexPT.test(val.PT) &&
          regexTechnology.test(val.Technology) &&
          regexProcesses.test(val.Phase)
        );
      })
    );
  }, [
    selectedPlant,
    selectedMainValving2,
    selectedRod2,
    selectedPT2,
    selectedTechnology2,
    [selectedProcesses, basedata]
  ]);

  // Effect to fetch data from Capacity API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/capApi/Capacity/")
      .then((response) => {
        setBasedata(response.data);
        setTbdata(response.data);
        setLoading(false);
        setIsDone(true);

        // Extract unique options from the fetched data
        let uniquePlants = new Set(response.data.map((val) => val.Plant));
        let uniqueMainValving2 = new Set(response.data.map((val) => val.MainValving));
        let uniqueRod2 = new Set(response.data.map((val) => val.Rod));
        let uniquePT2 = new Set(response.data.map((val) => val.PT));
        let uniqueTechnologies2 = new Set(response.data.map((val) => val.Technology));

        // Set state variables for unique options
        setUnqPlant(Array.from(uniquePlants));
        setUnqMainValving(Array.from(uniqueMainValving2));
        setUnqRod(Array.from(uniqueRod2));
        setUnqPT(Array.from(uniquePT2));
        setUnqTechnology(Array.from(uniqueTechnologies2));
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Function to display data in the table
  const showData = () => {
    let sum = 0;
    const reqData = tbdata.map((row, i) => {
      const ctValue = parseInt(row.CT, 10);
      if (!isNaN(ctValue)) {
        sum += ctValue;
      }
      return (
        <tr key={row.EQID + row.Plant + i}>
          <td>{row.id}</td>
         
