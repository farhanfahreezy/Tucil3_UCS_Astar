import React, { useEffect } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";

function Graph() {
  useEffect(() => {
    // Matriks ketetanggaan berbobot
    const w = [
      [0, 0.5, 0.3, 0.2],
      [0.5, 0, 0.4, 0.1],
      [0.3, 0.4, 0, 0.3],
      [0.2, 0.1, 0.3, 0]
    ];

    // Membuat nodes dan edges
    const nodes = new DataSet([...Array(w.length)].map((_, i) => ({ id: i })));
    const edges = new DataSet();
    w.forEach((row, i) =>
      row.forEach((weight, j) => {
        if (weight !== 0) {
          edges.add({ from: i, to: j, width: weight * 5 });
        }
      })
    );

    // Mengatur tata letak graf
    const options = {
      layout: {
        hierarchical: false,
        randomSeed: 2,
      },
      nodes: {
        shape: "circle",
        size: 20,
        color: {
          background: "#c7e9c0",
        },
      },
      edges: {
        color: "#2b8cbe",
        width: (edge) => edge.width,
      },
      physics: false,
    };
    const container = document.getElementById("graph");
    const network = new Network(container, { nodes, edges }, options);
  }, []);

  return <div id="graph"></div>;
}

export default Graph;
