import { getDistance } from "./Calculator";

function toWeightedAdjacencyMatrix (adjMat, nodes) {
    for (let i = 0; i < adjMat.length; i++) {
        for (let j = 0; j < i; j++) {
            if (adjMat[i][j] == 1) {
                const { name: n1, lat: lat1, lon: lon1 } = nodes[i]; 
                const { name: n2, lat: lat2, lon: lon2 } = nodes[j]; 
                
                adjMat[i][j] = getDistance(lat1, lon1, lat2, lon2);
                adjMat[j][i] = adjMat[i][j];
            }
        }
    }
    
    return adjMat;
}

export async function parseFile(fileContent) {
    const lines = fileContent.split("\n"); // memisahkan file menjadi baris-baris
    const nodeCount = parseInt(lines[0]); // mendapatkan jumlah simpul
    const nodes = []; // array untuk menyimpan nama simpul dan koordinat
    
    // mengambil informasi setiap simpul
    for (let i = 1; i <= nodeCount; i++) {
        const [nodeName, coord] = lines[i].split(" "); // memisahkan nama simpul dan koordinat
        const [lat, lon] = coord.split(",").map(parseFloat); // memisahkan koordinat menjadi latitude dan longitude
        nodes.push({ name: nodeName, lat, lon, id : i }); // menambahkan nama simpul dan koordinat beserta id ke array nodes
    }
    
    let adjacencyMatrix = []; // array untuk menyimpan matriks ketetanggaan
    
    // mengambil informasi matriks ketetanggaan
    for (let i = nodeCount + 1; i < lines.length; i++) {
        const row = lines[i].split(" ").map(parseFloat); // memisahkan setiap nilai dalam baris
        adjacencyMatrix.push(row); // menambahkan baris matriks ke array adjacencyMatrix
    }
    
    let weightedAdjacencyMatrix = await toWeightedAdjacencyMatrix(adjacencyMatrix, nodes);
    return { nodeCount, nodes, weightedAdjacencyMatrix }; // mengembalikan hasil parsing
}

export default parseFile;