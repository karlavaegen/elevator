{
    init: function(elevators, floors) {

        for(var i = 0; i < elevators.length; i++){
            var elevator = elevators[i];

            elevator.on("passing_floor", function(floorNum, direction){
                var queue = this.destinationQueue;
                queue = queue.filter(function(value, index, self){
                    return self.indexOf(value) === index;
                });

                if(queue.indexOf(floorNum) > -1){
                    this.goToFloor(floorNum, true);
                    queue = queue.filter(function(x){
                        x != floorNum;
                    });
                    this.checkDestinationQueue();
                }
                console.log(elevators.indexOf(this) + ": " + this.destinationQueue.toString());
            });


            elevator.on("floor_button_pressed", function(floorNum){
                this.goToFloor(floorNum);
                console.log("elevator " + i + " was queued to " + floorNum + " by internal button press");
            });

        }

        for(var j = 0; j < floors.length; j++){
            var floor = floors.reduce(function(a,b){
                if(a.floorNum() === j){
                    return a;
                }
                else {
                    return b;
                }
            });
            floor.on("up_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].goToFloor(this.floorNum());
                    console.log("elevator " + i + " was queued by up button on floor " + this.floorNum());
                }
            });
            floor.on("down_button_pressed", function(){
                for(var i = 0; i < elevators.length; i++){
                    elevators[i].goToFloor(this.floorNum());
                    console.log("elevator " + i + " was queued by down button on floor " + this.floorNum());
                }
            });
        }

    },
    update: function(dt, elevators, floors) {
    }
}
