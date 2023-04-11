import React, { useState } from "react";
import parseFile from "./Parser";
import { searchPathUCS } from "./UCS";

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);
  // const [path, setPath] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
      const getPath = searchPathUCS(1,2,data.nodes,data.nodeCount,data.weightedAdjacencyMatrix);
      setPath(getPath);
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
          <br></br>
          adjacencyMatrix: {data.weightedAdjacencyMatrix.map(row => row.join(' ')).join('\n')}
          <br></br>
          {/* path : {path.path} */}
        </div>
      )}
    </div>
  );
}

export default FileInput;