import React, { useState } from "react";
import parseFile from "./Parser";
import { MapComponent } from "./Map";
import { searchPathUCS } from "./UCS";
import { searchPathAstar } from "./Astar";

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
      const pathUCS= await searchPathUCS(parsedData.nodes[12],parsedData.nodes[3],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      console.log("UCS Result");
      console.log(pathUCS);
      const pathAstar= await searchPathAstar(parsedData.nodes[12],parsedData.nodes[3],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      console.log("AStar Result");
      console.log(pathAstar);
    
      // setPath(getPath);
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    // Menggunakan isi file yang disimpan di state
    console.log(fileContent);
  };

  return (
    <div>
      {/* <MapComponent data = {data} /> */}
      {data ? <MapComponent data={data} /> : null}

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