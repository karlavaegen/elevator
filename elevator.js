{
    init: function(elevators, floors) {

        for(var i = 0; i < elevators.length; i++){
            var elevator = elevators[i];

            elevator.smartQueue = function(floorNum){
                var queue = elevator.destinationQueue;
                if(queue.indexOf(floorNum) === -1){
                    queue.push(floorNum);
                }
                queue = queue.filter(function(value, index, self){
                    return self.indexOf(value) === index;
                });

                if(elevator.destinationDirection() === "stopped"){
                    queue = queue.filter(function(value){
                        return value != elevator.currentFloor();
                    });
                }
                else if(elevator.destinationDirection() === "up"){
                    queue.sort();
                    for(var i = 0; i < queue; i++){
                        if(queue[i] < elevator.currentFloor()){
                            queue.push(queue.splice(i, 1));
                        }
                    }
                }
                else {
                    queue.sort(function(a,b){
                        return b - a;
                    });
                    for(var i = 0; i < queue; i++){
                        if(queue[i] > elevator.currentFloor()){
                            queue.push(queue.splice(i, 1));
                        }
                    }
                }

                console.log(elevator.destinationQueue);
                elevator.checkDestinationQueue();
            }


            for(var i = 0; i < floors.length; i++){
                var floor = floors[i];
                floor.on("up_button_pressed", function(){
                    elevator.smartQueue(floor.floorNum());
                });
                floor.on("down_button_pressed", function(){
                    elevator.smartQueue(floor.floorNum());
                });
            }

            elevator.on("floor_button_pressed", function(floorNum){
                elevator.smartQueue(floorNum);
            });

            elevator.on("idle", function(){
                console.log("was stuck for some reason");
                elevator.goToFloor(0);
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
