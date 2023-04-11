import React, { useState } from "react";
import parseFile from "./Parser";
import { MapComponent } from "./Map";
import { searchPathUCS } from "./UCS";

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);
  const [path, setPath] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
      const path = await searchPathUCS(parsedData.nodes[12],parsedData.nodes[3],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      console.log(path);
      console.log(path[path.length-1]);
      // setPath(getPath);
    };

    reader.readAsText(file);
  };

  // const handleButtonClick = () => {
  //   // Menggunakan isi file yang disimpan di state
  //   console.log(fileContent);
  // };
  const styles = `
  input[type="file"] {
    color: white;
    background-color: transparent;
    border: none;
  }
  `;



  return (
    <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
      <div data-aos="fade-up" data-aos-delay="400" data-aos-offset="1">
        {/* <MapComponent data = {data} /> */}
        {data ? <MapComponent data={data} /> : null}

        {/* <style>{styles}</style> */}
        <input className="
        btn-sm 
        text-white 
        bg-purple-600 
        hover:bg-purple-700 
        ml-3 
        z-10" 
        type="file" accept=".txt" onChange={handleFileChange} />
        {/* <button onClick={handleButtonClick}>Gunakan Isi File</button> */}
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
    </div>
  );
}

export default FileInput;