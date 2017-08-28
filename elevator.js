var moment = require('moment');
var newDate = new Date()

export default class Elevator {
  constructor() {
    this.currentFloor = 0;
    this.queue = [];
    this.currentRiders = [];
    this.totalFloors = 0;
    this.totalStops = 0;
    this.time = moment().format('LT');
  }
  goToFloor(userObj) {
    this.queue.push(userObj.currentFloor, userObj.dropOffFloor)
    this.currentRiders.push(userObj.name)

    while(this.queue.length > 0) {

      if(this.currentFloor < this.queue[0]) {
        console.log('going up');
        this.currentFloor ++
        this.totalFloors ++

      } else if (this.currentFloor > this.queue[0]) {
        console.log('going down');
        this.currentFloor --
        this.totalFloors ++

      } else if (this.queue[0] === this.currentFloor) {
        this.queue.shift();
        this.currentRiders.shift();
        this.totalStops ++
        this.totalFloors ++
      }
    }
    if(!this.queue.length && this.time <= '12:00pm') {
      console.log('no shit')
      this.currentFloor = 0;
    } else if (!this.queue.length && this.time > '12:00pm') {
      return
    }
  }

  reset() {
    this.totalFloors = 0;
    this.totalStops = 0;
    this.currentRiders = [];
  }
}

class Person extends Elevator {
  constructor() {
    super()
    this.name = name;
    this.currentFloor = currentFloor;
    this.dropOffFloor = dropOffFloor;
  }
}
