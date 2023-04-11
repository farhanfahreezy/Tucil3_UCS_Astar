import React from "react";
import FileInput from "./FileInput";

function Example() {
  // mengakses nilai data dari FileInput
  const [data, setData] = React.useState(null);

  return (
    <div>
        pppp
      {data && (
        <div>
          num of nodes: {data.nodeCount}
          adjacencyMatrix: {data.weightedAdjacencyMatrix
            .map((row) => row.join(" "))
            .join("\n")}
          PPPPPP
        </div>
      )}
      apoxkapskx
    </div>
  );
}

export default Example;
