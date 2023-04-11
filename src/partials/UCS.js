import { PrioQueue } from "./PrioQueue";

export function searchPathUCS(start,finish,nodes,weightedAdjacencyMatrix){
    // Inisiasi PriorityQueue dan activeNode
    const pQueue = new PrioQueue();
    let activeNode = {
        node : start,
        step : 0,
        path : [start.id]
    };

    // Masukkan activeNode ke queue
    pQueue.enqueue(activeNode.node,activeNode.step,activeNode.path);

    // Mencari jawaban dengan algoritma UCS
    while(activeNode.node != finish){
        activeNode = doTheThing(pQueue,finish,weightedAdjacencyMatrix,nodes);
    }
    return activeNode;
}

function doTheThing(pQueue,finish,weightedAdjacencyMatrix,nodes){
    // Algoritma UCS

    // Mengeluarkan isi queue paling depan
    let activeNode = pQueue.dequeue();

    if(activeNode.node == finish){
        // Mengecek jika activeNode merupakan finish
        return activeNode;
    } else {
        // Mengecek semua adjacent node
        for(let i = 0;i<weightedAdjacencyMatrix[0].length;i++){
            if(weightedAdjacencyMatrix[activeNode.node.id-1][i]!=0){
                let id = i+1;
                if(id != activeNode.path[(activeNode.path).length-1]){
                    // Megecek agar pencarian tidak mundur kebelakang
                    let newPath = activeNode.path.slice();
                    let newStep = activeNode.step + weightedAdjacencyMatrix[activeNode.node.id-1][i];
                    newPath.push(id);

                    // Memasukkan elemen baru ke queue
                    pQueue.enqueue(getNodesById(id,nodes),newStep,newPath);
                }
            }
        }
    }
    return activeNode;
}

function getNodesById(id,nodes){
    // Mendapatkan node dari nodes berdasarkan id
    for(let i = 0; i<nodes.length;i++){
        if(nodes[i].id == id){
            return nodes[i];
        }
    }
}