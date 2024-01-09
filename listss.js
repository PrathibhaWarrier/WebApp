import React, { useState, useEffect } from "react";
import axios from 'axios';
import './barcodecss.css'; 
import BopFilter from './BopFilter.js';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
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
  const [stationCheck1, setStationCheck1] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState({
    plant: "",
    technology: "",
    mainValving: "",
    rod: "",
    pt:"",
  });
  const [buttonClicked, setButtonClicked] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const handleCheckboxChange = (index) => {
    // Your existing checkbox handling logic
  };

  const filterPlantCallback = (selPlant) => {
    // Your existing filter callback logic
  };

  const filterMainValvingCallback = (selMainValving) => {
    // Your existing filter callback logic
  };

  const filterRodCallback = (selRod) => {
    // Your existing filter callback logic
  };

  const filterPTCallback = (selPT) => {
    // Your existing filter callback logic
  };

  const filterTechnologyCallback = (selTechnology) => {
    // Your existing filter callback logic
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  useEffect(() => {
    let regexPlant = new RegExp([`^${selectedPlant}`], "i");
    let regexMainValving = new RegExp([`^${selectedMainValving}`], "i");
    let regexRod = new RegExp([`^${selectedRod}`], "i");
    let regexPT = new RegExp([`^${selectedPT}`], "i");
    let regexTechnology = new RegExp([`^${selectedTechnology}`], "i");

    setFilteredData(
      basedata.filter((val) => {
        return (
          regexPlant.test(val.Plant) &&
          regexMainValving.test(val.MainValving) &&
          regexRod.test(val.Rod) &&
          regexPT.test(val.PT) &&
          regexTechnology.test(val.Technology)
        );
      })
    );
  }, [buttonClicked, selectedPlant, selectedMainValving, selectedRod, selectedPT, selectedTechnology]);

  useEffect(() => {
    if (!buttonClicked) {
      // Load all data initially if the button is not clicked
      setFilteredData(basedata);
    }
  }, [buttonClicked]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/capApi/Capacity/")
      .then((response) => {
        setBasedata(response.data);
        setTbdata(response.data);
        setLoading(false);
        setIsDone(true);

        let uniquePlants = new Set(response.data.map((val) => val.Plant));
        let uniqueMainValving = new Set(response.data.map((val) => val.MainValving));
        let uniqueRod = new Set(response.data.map((val) => val.Rod));
        let uniquePT = new Set(response.data.map((val) => val.PT));
        let uniqueTechnologies = new Set(response.data.map((val) => val.Technology));

        setUnqPlant(Array.from(uniquePlants));
        setUnqMainValving(Array.from(uniqueMainValving));
        setUnqRod(Array.from(uniqueRod));
        setUnqPT(Array.from(uniquePT));
        setUnqTechnology(Array.from(uniqueTechnologies));
      })
      .catch((error) => {
        setErr(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  const showData = () => {
    let sum = 0;
    const dataToShow = buttonClicked ? filteredData : tbdata;

    const reqData = dataToShow.map((row, i) => {
      // Your existing mapping logic
    });

    reqData.push(
      <tr key="sum">
        <td></td> {/* Empty cell corresponding to the checkbox column */}
        <td></td> {/* Empty cell corresponding to the CT values */}
        <td></td> {/* Empty cell corresponding to the CT values */}
        <td></td> {/* Empty cell corresponding to the CT values */}
        <td></td> {/* Empty cell corresponding to the CT values */}
        <td></td> {/* Empty cell corresponding to the CT values */}
        <td>Sum: {sum}</td> {/* Display the sum at the end of the column */}
      </tr>
    );

    return reqData;
  };

  return (
    <React.Fragment>
      <BopFilter
        plant={unqPlant}
        mainValving={unqMainValving}
        rod={unqRod}
        pt={unqPT}        
        technology={unqTechnology}
        filterPlantCallback={filterPlantCallback}
        filterMainValvingCallback={filterMainValvingCallback}
        filterRodCallback={filterRodCallback}
        filterPTCallback={filterPTCallback}        
        filterTechnologyCallback={filterTechnologyCallback}
      />

      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CapacityPlanning</CardTitle>
                <button onClick={handleButtonClick}>Show Filtered Data</button>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">BOP LINE ID</th>
                      {/* Your existing table headers */}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {console.log(isDone)}
                    {isDone ? showData() : null}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Tables;
