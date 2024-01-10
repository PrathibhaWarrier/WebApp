import React, { useState } from "react";
import { Table, FormGroup, Label, Input } from "reactstrap";

function YourComponent() {
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [tableData, setTableData] = useState(/* Your dataset here */);

  const handleCheckboxChange = (process) => {
    // Toggle the selected state for the process
    setSelectedProcesses((prevSelected) =>
      prevSelected.includes(process)
        ? prevSelected.filter((p) => p !== process)
        : [...prevSelected, process]
    );
  };

  const showData = () => {
    return tableData.map((row, i) => (
      <tr key={i}>
        {/* Add columns you want to display, e.g., row.Phase */}
        <td>{row.Phase}</td>
      </tr>
    ));
  };

  return (
    <div>
      {/* Your checkboxes for process selection */}
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            onChange={() => handleCheckboxChange("Base Assembly")}
          />
          Base Assembly
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            onChange={() => handleCheckboxChange("Valve Assembly")}
          />
          Valve Assembly
        </Label>
      </FormGroup>
      {/* Add more checkboxes for other processes */}
      
      {/* Your table to display selected processes */}
      <Table>
        <thead>
          <tr>
            <th>Phase</th>
            {/* Add more headers for other columns */}
          </tr>
        </thead>
        <tbody>{showData()}</tbody>
      </Table>
    </div>
  );
}

export default YourComponent;
