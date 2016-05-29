{
    init: function(elevators, floors) {

        for(var i = 0; i < elevators.length; i++){
            var elevator = elevators[i];

            elevator.smartQueue = function(floorNum){
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


            elevator.on("floor_button_pressed", function(floorNum){
                elevator.smartQueue(floorNum);
                console.log("elevator " + i + " was queued to " + floorNum + " by internal button press");
            });

            elevator.on("idle", function(){
                console.log(elevators.indexOf(this) + ": was stuck for some reason");
            });
        }

        for(var j = 0; j < floors.length; ++j){
            var floor = floors[j];
            floor.on("up_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].smartQueue(floor.floorNum());
                    console.log("elevator " + i + " was queued by up button on floor " + floor.floorNum());
                }
            });
            floor.on("down_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].smartQueue(floor.floorNum());
                    console.log("elevator " + i + " was queued by down button on floor " + floor.floorNum());
                }
            });
        }

    },
    update: function(dt, elevators, floors) {
    }
}
