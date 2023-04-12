import React, { useState,useEffect } from "react";
import parseFile from "./Parser";
import { MapComponent } from "./Map";
import { getNodesById, searchPathUCS } from "./UCS";
import { searchPathAstar } from "./Astar";
import '../css/style.css';

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);
  const [searchMethod, setSearchMethod] = useState("UCS"); // default search method is UCS
  const [result, setResult] = useState([]); // default search method is UCS

  useEffect(() => {
    console.log(result);
  }, [result]);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
      // const pathUCS= await searchPathUCS(parsedData.nodes[11],parsedData.nodes[13],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      // console.log("UCS Result");
      // console.log(pathUCS);
      // const pathAstar= await searchPathAstar(parsedData.nodes[12],parsedData.nodes[3],parsedData.nodes,parsedData.weightedAdjacencyMatrix);
      // console.log("AStar Result");
      // console.log(pathAstar);
    };

    reader.readAsText(file);
  };

  const handleSearchMethodChange = (e) => {
    setSearchMethod(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    let path = [];
    if (searchMethod === "UCS") {
      path = await searchPathUCS(
        data.nodes[0],
        data.nodes[21],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("UCS Result");
      console.log(path);
    } else {
      path = await searchPathAstar(
        data.nodes[0],
        data.nodes[21],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("AStar Result");
      console.log(path);
    }
    await setResult((path.path));
    console.log("result: ", result);
};

  return (
    // <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
    // <div className="flex flex-col md:flex-row">
    <div className="row">
      <div data-aos="fade-up" data-aos-delay="400" data-aos-offset="1">
        {/* <MapComponent data = {data} /> */}
        {/* {data ? <div className="column" style={{width:"70%", padding:"0 5px"}}> */}
        <div className="column" style={{width:"70%", padding:"0 5px"}}>
          <MapComponent data={data} result={result} />
        </div>
        {/* </div> */}
         {/* : null} */}

        <div className="column" style={{width:"30%"}}>
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

          <div className="mt-3 flex items-left justify-left">
            <label className="auto">Search Method:</label>
            <div className="flex items-left">
              <div className="mr-6">
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
          > Search
          </button>
        </div>
      </div>

    </div>
  );
}

export default FileInput;