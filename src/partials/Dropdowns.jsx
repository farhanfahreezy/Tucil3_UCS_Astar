import React, { useState } from "react";

function Dropdowns({ options, onId1Change, onId2Change }) {
  if (!options[0]) {
    return;
  }
  const [id1, setId1] = useState(options[0].id);
  const [id2, setId2] = useState(options[0].id);

  const handleId1Change = (e) => {
    const newId1 = e.target.value;
    setId1(newId1);
    onId1Change(newId1);
  };

  const handleId2Change = (e) => {
    const newId2 = e.target.value;
    setId2(newId2);
    onId2Change(newId2);
  };

  return (
    <div>
      <label htmlFor="id1">Select Origin: </label>
      <select id="id1" value={id1} onChange={handleId1Change} style={{color: "black"}}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      <br></br>
      <label htmlFor="id2">Select Destination: </label>
      <select id="id2" value={id2} onChange={handleId2Change} style={{color: "black"}}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdowns;
