export class PrioQueue{
    constructor(){
        this.queue = [];
    }

    enqueue(node,step,path){
        var queueElement = {
            node,
            step,
            path
        };
        var added = false;
        for (var i = 0; i < this.queue.length; i++) {
            if (queueElement.step < this.queue[i].step) {
                this.queue.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.queue.push(queueElement);
        }
    }

    dequeue(){
        return this.queue.shift();
    }

}