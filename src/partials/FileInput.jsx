import React, { useState } from "react";
import parseFile from "./Parser";
import { MapComponent } from "./Map";
import { searchPathUCS } from "./UCS";
import { searchPathAstar } from "./Astar";

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);
  const [searchMethod, setSearchMethod] = useState("UCS"); // default search method is UCS

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
      const pathUCS= await searchPathUCS(parsedData.nodes[2],parsedData.nodes[14],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      console.log("UCS Result");
      console.log(pathUCS);
      const pathAstar= await searchPathAstar(parsedData.nodes[2],parsedData.nodes[14],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      console.log("AStar Result");
      console.log(pathAstar);
    
      // setPath(getPath);
    };

    reader.readAsText(file);
  };

  const handleSearchMethodChange = (e) => {
    setSearchMethod(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    if (!data) return;

    let path;
    if (searchMethod === "UCS") {
      path = await searchPathUCS(
        data.nodes[12],
        data.nodes[3],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("UCS Result");
      console.log(path);
    } else {
      path = await searchPathAstar(
        data.nodes[12],
        data.nodes[3],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("AStar Result");
      console.log(path);
    }
  };

  return (
    <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
      <div data-aos="fade-up" data-aos-delay="400" data-aos-offset="1">
        {/* <MapComponent data = {data} /> */}
        <div>
          {data ? <MapComponent data={data} /> : null}
        </div>

        <div>
          <input className="
            btn-sm 
            text-white 
            bg-purple-600 
            hover:bg-purple-700 
            ml-3 
            z-10" 
            type="file" accept=".txt" onChange={handleFileChange} />
        </div>

        <div className="mt-3 flex items-center justify-center">
          <label className="mr-2">Search Method:</label>
          <div className="flex items-center">
            <div className="mr-2">
              <input
                type="radio"
                id="UCS"
                name="searchMethod"
                value="UCS"
                checked={searchMethod === "UCS"}
                onChange={handleSearchMethodChange}
              />
              <label htmlFor="UCS">UCS</label>
            </div>
            <div>
              <input
                type="radio"
                id="AStar"
                name="searchMethod"
                value="AStar"
                checked={searchMethod === "AStar"}
                onChange={handleSearchMethodChange}
              />
              <label htmlFor="AStar">A*</label>
            </div>
          </div>
        </div>

        <button
          className="
            btn-sm 
            text-white 
            bg-purple-600 
            hover:bg-purple-700 
            mt-3 
            z-10"
          onClick={handleSearchButtonClick}
        />
      </div>

    </div>
  );
}

export default FileInput;