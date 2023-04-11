import { getDistance } from "./Calculator";
import { getNodesById } from "./UCS";
import { PrioQueue } from "./PrioQueue";

export function searchPathAstar(start,finish,nodes,weightedAdjacencyMatrix){
    // Inisiasi Hashmap
    const heuristicDist = getHeuristicDistance(nodes,finish);
    const pQueue = new PrioQueue();
    let activeNode = {
        node : start,
        step : heuristicDist[start.id],
        path : [start.id]
    };

    // Masukkan activeNode ke queue
    pQueue.enqueue(activeNode.node,activeNode.step,activeNode.path);

    console.time("astrTIME");
    // Mencari jawaban dengan algoritma UCS
    while(activeNode.node != finish){
        activeNode = doTheThing(pQueue,finish,weightedAdjacencyMatrix,nodes,heuristicDist);
    }
    console.timeEnd("astrTIME");
    return activeNode;

}

function doTheThing(pQueue,finish,weightedAdjacencyMatrix,nodes,heuristicDist){
    // Algoritma UCS

    // Mengeluarkan isi queue paling depan
    let activeNode = pQueue.dequeue();

    if(activeNode.node == finish){
        // Mengecek jika activeNode merupakan finish
        return activeNode;
    } else {
        // Mengecek semua adjacent node
        let activeNoHeuristic = activeNode.step - heuristicDist[activeNode.node.id];
        for(let i = 0;i<weightedAdjacencyMatrix[0].length;i++){
            if(weightedAdjacencyMatrix[activeNode.node.id-1][i]!=0){
                let id = i+1;
                if(!activeNode.path.includes(id)){
                    // Megecek agar pencarian tidak mundur kebelakang
                    let newPath = activeNode.path.slice();
                    let newStep = activeNoHeuristic + weightedAdjacencyMatrix[activeNode.node.id-1][i] + heuristicDist[id];
                    newPath.push(id);

                    // Memasukkan elemen baru ke queue
                    pQueue.enqueue(getNodesById(id,nodes),newStep,newPath);
                }
            }
        }
    }
    return activeNode;
}

function getHeuristicDistance(nodes,finish){
    const hashMap = {};
    for(let i = 0;i<nodes.length;i++){
        let id = i+1;
        let check = getNodesById(id,nodes);
        if(check!=finish){
            hashMap[id] = getDistance(check.lat,check.lon,finish.lat,finish.lon);
        } else {
            hashMap[id] = 0;
        }
    }
    return hashMap;
}