{
    init: function(elevators, floors) {

        for(var i = 0; i < elevators.length; i++){
            elevators[i].smartQueue = function(floorNum){
                if(this.loadFactor() === 1){ return; }
                var queue = this.destinationQueue;
                if(queue.indexOf(floorNum) === -1){
                    queue.push(floorNum);
                }
                queue = queue.filter(function(value, index, self){
                    return self.indexOf(value) === index;
                });

                if(this.destinationDirection() === "up"){
                    queue.sort();
                    for(var j = 0; j < queue.length; j++){
                        if(queue[j] < this.currentFloor()){
                            queue.push(queue.splice(j, 1));
                        }
                    }
                }
                else if (this.destinationDirection() === "down"){
                    queue.sort(function(a,b){
                        return b - a;
                    });
                    for(var j = 0; j < queue.length; j++){
                        if(queue[j] > this.currentFloor()){
                            queue.push(queue.splice(j, 1));
                        }
                    }
                }

                console.log(elevators.indexOf(this) + ": " + this.destinationQueue.toString());
                this.checkDestinationQueue();
            }


            elevators[i].on("floor_button_pressed", function(floorNum){
                this.goToFloor(floorNum, true);
            });

        }

        for(var j = 0; j < floors.length; j++){
            floors[j].on("up_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].smartQueue(this.floorNum());
                }
            });
            floors[j].on("down_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].smartQueue(this.floorNum());
                }
            });
        }

    },
        update: function(dt, elevators, floors) {
        }
}
