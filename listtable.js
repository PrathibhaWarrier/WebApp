// Tables.js
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
  const [selectedAssemblyArea, setSelectedAssemblyArea] = useState(null);

  const handleButtonClick = (assemblyArea) => {
    setSelectedAssemblyArea(assemblyArea);
  };

  useEffect(() => {
    let regexPlant = new RegExp([`^${selectedPlant}`], "i");
    let regexMainValving = new RegExp([`^${selectedMainValving}`], "i");
    let regexRod = new RegExp([`^${selectedRod}`], "i");
    let regexPT = new RegExp([`^${selectedPT}`], "i");
    let regexTechnology = new RegExp([`^${selectedTechnology}`], "i");

    setTbdata(
      basedata.filter((val) => {
        return (
          regexPlant.test(val.Plant) &&
          regexMainValving.test(val.MainValving) &&
          regexRod.test(val.Rod) &&
          regexPT.test(val.PT) &&
          regexTechnology.test(val.Technology) &&
          (!selectedAssemblyArea || val.AssemblyArea === selectedAssemblyArea)
        );
      })
    );
  }, [selectedPlant, selectedMainValving, selectedRod, selectedPT, selectedTechnology, selectedAssemblyArea]);

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
    const filteredData = tbdata.filter((row) =>
      selectedAssemblyArea ? row.AssemblyArea === selectedAssemblyArea : true
    );

    return filteredData.map((row, i) => (
      <tr key={row.EQID + row.Plant + i}>
        <td>{row.id}</td>
        <td>{row.Plant}</td>
        <td>{row.Phase}</td>
        <td>{row.EQID}</td>
        <td>{row.Equipment}</td>
        <td>
          <input
            type="checkbox"
            id={`stationCheck${i}`}
            name={`stationCheck${i}`}
            value={`optionChecked${i}`}
            onChange={() => handleCheckboxChange(i)}
            checked={row.stationCheck1 || false}
          />
          <label htmlFor={`stationCheck${i}`}>Option</label>
        </td>
        <td>{row.stationCheck1 ? null : row.CT}</td>
      </tr>
    ));
  };

  const handleCheckboxChange = (index) => {
    setTbdata((prevData) => {
      const newData = [...prevData];
      newData[index].stationCheck1 = !newData[index].stationCheck1;

      if (newData[index].stationCheck1) {
        newData[index].originalCT = newData[index].CT;
        newData[index].CT = null;
      } else {
        newData[index].CT = newData[index].originalCT;
        delete newData[index].originalCT;
      }

      return newData;
    });
  };

  const assemblyAreaButtons = ["Rod Manufacturing", /* other buttons */].map((area) => (
    <button
      key={area}
      onClick={() => handleButtonClick(area)}
      className={selectedAssemblyArea === area ? "selected" : ""}
    >
      {area}
    </button>
  ));

  return (
    <>
      <BopFilter
        plant={unqPlant}
        mainValving={unqMainValving}
        rod={unqRod}
        pt={unqPT}        
        technology={unqTechnology}
        filterPlantCallback={(selPlant) => setSelectedPlant(selPlant.val)}
        filterMainValvingCallback={(selMainValving) => setSelectedMainValving(selMainValving.val)}
        filterRodCallback={(selRod) => setSelectedRod(selRod.val)}
        filterPTCallback={(selPT) => setSelectedPT(selPT.val)}        
        filterTechnologyCallback={(selTechnology) => setSelectedTechnology(selTechnology.val)}
      />

      <div className="assembly-area-buttons">
        {assemblyAreaButtons}
      </div>

      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Capacity Model</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>#</th>
                    <th>Plant</th>
                    <th>Phase</th>
                    <th>EQID</th>
                    <th>Equipment</th>
                    <th>Option</th>
                    <th>CT</th>
                  </tr>
                </thead>
                <tbody>{isDone ? showData() : null}</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Tables;
