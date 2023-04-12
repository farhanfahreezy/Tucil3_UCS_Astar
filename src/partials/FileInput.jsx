import React, { useState,useEffect } from "react";
import parseFile from "./Parser";
import { MapComponent } from "./Map";
import { getNodesById, searchPathUCS } from "./UCS";
import { searchPathAstar } from "./Astar";
import Dropdowns from "./Dropdowns";
import '../css/style.css';

function FileInput() {
  const [fileContent, setFileContent] = useState("");
  const [data, setData] = useState(null);
  const [searchMethod, setSearchMethod] = useState("UCS"); // default search method is UCS
  const [result, setResult] = useState([]); // default search method is UCS
  const [time, setTime] = useState(null); // default search method is UCS
  const [distance, setDistance] = useState(null); // default search method is UCS

  const [id1, setId1] = useState("1");
  const [id2, setId2] = useState("1");
  const [resNode, setResNode] = useState([]);

  const handleId1Change = (newId1) => {
    setId1(newId1);
  };

  const handleId2Change = (newId2) => {
    setId2(newId2);
  };

  const options = [];
  if (data) {

    for (let i = 1; i <= data.nodes.length; i++) {
      options.push(
        { id: `${i}`, name: `${i}. ${data.nodes[i-1].name}` },
      );
    }
  } 
  
  useEffect(() => {
    setResNode([]);

    if (result.length != 0) {
      const nodes = result.map(i => `${data.nodes[i-1].name}`); // ambil setiap node dari data.nodes
      const nodesStr = nodes.join(' -> '); // gabungkan setiap node dengan pemisah '->'
      setResNode(nodesStr);        
    }
  }, [result]);
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setResult([]);

    // Membaca isi file menggunakan FileReader
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const parsedData = await parseFile(content);
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  const handleSearchMethodChange = (e) => {
    setSearchMethod(e.target.value);
  };

  const handleSearchButtonClick = async () => {
    let path = [];
    let t0= performance.now(); //start time
    if (searchMethod === "UCS") {
      path = await searchPathUCS(
        data.nodes[id1-1],
        data.nodes[id2-1],
        // data.nodes[12],
        // data.nodes[3],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("UCS Result");
      console.log(path);
    } else {
      path = await searchPathAstar(
        data.nodes[id1-1],
        data.nodes[id2-1],
        // data.nodes[12],
        // data.nodes[3],
        data.nodes,
        data.weightedAdjacencyMatrix
      );
      console.log("AStar Result");
      console.log(path);
    }
    let t1= performance.now(); //end time

    await setResult((path.path));
    await setDistance((path.step));
    setTime(t1-t0);    
};

  return (
    <div className="row">
      <div data-aos="fade-up" data-aos-delay="400" data-aos-offset="1">
        {/* <MapComponent data = {data} /> */}
        {/* {data ? <div className="column" style={{width:"70%", padding:"0 5px"}}> */}
        <div className="column" style={{width:"70%", padding:"0 5px"}}>
          <MapComponent data={data} result={result} />
        </div>

        <div className="column" style={{width:"30%"}}>
          <div className="mt-3 flex items-left justify-left">
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

          <div>
            <Dropdowns
              options={options}
              onId1Change={handleId1Change}
              onId2Change={handleId2Change}
            />
          </div>

          <button
            className=" btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-3 z-10"
            onClick={handleSearchButtonClick}
          > Search
          </button>
          
          <br>
          </br>
          <br>
          </br>

          {distance && (
            <div>
              Total Distance: {distance.toFixed(3)} m
            </div>
          )}

          <br/>

          {resNode && (
            <div>
              Result Route: <br />{resNode}
            </div>
          )}

          <br />
          {time && 
            <div>
              Execution Time: {time.toFixed(3)} ms
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default FileInput;