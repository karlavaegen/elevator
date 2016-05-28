{
    init: function(elevators, floors) {
        var globalQueue = [];

        function getClosestFloor(ary, currentFloor){
            ary.sort(function(a,b){
                if(Math.abs(b - currentFloor) < Math.abs(a - currentFloor)){
                    return -1;
                }
                else if(Math.abs(b - currentFloor) > Math.abs(a - currentFloor)){
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return ary.shift();
        };

        for(var i = 0; i < elevators.length; i++){
            var elevator = elevators[i];
            elevator.on("idle", function(){
                if(globalQueue.length > 0){
                    var dest = getClosestFloor(globalQueue, elevator.currentFloor());
                    elevator.goToFloor(dest);
                }
            });
        }

        for(var i = 0; i < floors.length; i++){
            var floor = floors[i];
            floor.on("up_button_pressed", function(){
                var floorNum = floor.floorNum();
                globalQueue.unshift(floorNum);
            });
            floor.on("down_button_pressed", function(){
                var floorNum = floor.floorNum();
                globalQueue.unshift(floorNum);
            });
        }

        for(var i = 0; i < elevators.length; i++){
            var elevator = elevators[i];
            elevator.on("floor_button_pressed", function(floorNum){
                globalQueue.unshift(floorNum);
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
