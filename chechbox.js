import React, { useState, useEffect } from "react";
import axios from "axios";
import "./barcodecss.css";
import BopFilter from "./BopFilter.js"; // Assuming you have BopFilter.js in the same directory

import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, FormGroup, Label, Input } from "reactstrap";

function Tables() {
  const [tbdata, setTbdata] = useState([]);
  const [basedata, setBasedata] = useState([]);
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  
  const handleProcessCheckboxChange = (process) => {
    setSelectedProcesses((prevSelected) =>
      prevSelected.includes(process)
        ? prevSelected.filter((p) => p !== process)
        : [...prevSelected, process]
    );
  };

  useEffect(() => {
    let regexProcesses = new RegExp(selectedProcesses.join("|"), "i");

    setTbdata(
      basedata.filter((val) => {
        return regexProcesses.test(val.Phase);
      })
    );
  }, [selectedProcesses, basedata]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/capApi/Capacity/")
      .then((response) => {
        setBasedata(response.data);
        setTbdata(response.data);
        // ... rest of your code
      })
      .catch((error) => {
        // ... handle error
      });
  }, []);

  const showData = () => {
    // Modify this function to match the structure of your table rows
    return tbdata.map((row, i) => (
      <tr key={row.EQID + row.Plant + i}>
        {/* ... display your table columns */}
        <td>{row.Phase}</td>
        {/* ... display other columns */}
      </tr>
    ));
  };

  return (
    <React.Fragment>
      <div className="content">
        <BopFilter
          // ... other props for BopFilter
          filterPlantCallback={/* ... your filterPlantCallback */}
          filterTechnologyCallback={/* ... your filterTechnologyCallback */}
          filterMainValvingCallback={/* ... your filterMainValvingCallback */}
          filterRodCallback={/* ... your filterRodCallback */}
          filterPTCallback={/* ... your filterPTCallback */}
        />

        {/* Your checkboxes for process selection */}
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={() => handleProcessCheckboxChange("Base Assembly")}
            />
            Base Assembly
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              onChange={() => handleProcessCheckboxChange("Valve Assembly")}
            />
            Valve Assembly
          </Label>
        </FormGroup>
        {/* Add more checkboxes for other processes */}

        {/* Your table to display selected processes */}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">CapacityPlanning</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      {/* Add headers for other columns */}
                      <th className="text-center">BOP LINE ID</th>
                      <th className="text-center">Plant</th>
                      {/* ... other headers */}
                      <th className="text-center">Phase</th>
                      {/* ... other headers */}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {showData()}
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
