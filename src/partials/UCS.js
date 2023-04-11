import { PrioQueue } from "./PrioQueue";

export function searchPathUCS(startt,finishh,nodes,nodeCount,weightedAdjacencyMatrix){
    // Kerjain
    let start = getNodesFromId(startt);
    let finish = getNodesFromId(finishh);
    const pQueue = new PrioQueue();
    pQueue.enqueue(start,0,[]);
    let activeNode = {
        node : start,
        step : 0,
        path : []
    };

    while(activeNode.node != finish){
        activeNode = doTheThing(pQueue,activeNode,finish,weightedAdjacencyMatrix,nodes,nodeCount);
    }
    return activeNode.path;
}

function doTheThing(pQueue,activeNode,finish,weightedAdjacencyMatrix,nodes,nodeCount){
    activeNode = pQueue.enqueue();

    if(activeNode.node == finish){
        // CHECK IF UDAH KETEMU
        return;
    } else {
        // ITERASI SEMUA ADJACENCY MATRIKS
        for(let i = 0;i<weightedAdjacencyMatrix[0].length;i++){
            // KALO BERTETANGGA
            if(weightedAdjacencyMatrix[activeNode.node.id-1][i]!=0){
                let id = i+1;
                
                if(activeNode.path.length==0){
                    // KALO YG PERTAMA
                    let newPath = [];
                    let newStep = activeNode.step + weightedAdjacencyMatrix[activeNode.node.id-1][i];
                    newPath.push(id);
                    pQueue.enqueue(getNodesFromId(id,nodes,nodeCount),newStep,newPath);

                } else {
                    // KALO ga YG PERTAMA
                    if(id != activeNode.path[activeNode.path.length-1]){
                        let newPath = activeNode.path;
                        let newStep = activeNode.step + weightedAdjacencyMatrix[activeNode.node.id-1][i];
                        newPath.push(id);
                        pQueue.enqueue(getNodesFromId(id,nodes,nodeCount),newStep,newPath);
                    }
                }
            }
        }
    }
}

function getNodesFromId(id,nodes,nodeCount){
    for(let i = 0; i<nodeCount;i++){
        if(nodes[i].id == id){
            return nodes[i];
        }
    }
}