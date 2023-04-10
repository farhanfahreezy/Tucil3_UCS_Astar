import React, { useState } from "react";
import parseFile from "./Parser";

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    // Menggunakan isi file yang disimpan di state
    console.log(fileContent);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleButtonClick}>Gunakan Isi File</button>
      {data && (
        <div>
          num of nodes: {data.nodeCount}
          adjacencyMatrix: {data.weightedAdjacencyMatrix.map(row => row.join(' ')).join('\n')}
        </div>
      )}
    </div>
  );
}

export default FileInput;