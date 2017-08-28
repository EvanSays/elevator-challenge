require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function () {
  let elevator = new Elevator();

  beforeEach(function () {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
  });

  it('should track the number of floors it traversed', () => {
    assert.equal(elevator.totalStops, 0);
    assert.equal(elevator.totalFloors, 0);
    let mockUser1 = { name: "Brittany", currentFloor: 5, dropOffFloor: 0 };
    elevator.goToFloor(mockUser1);
    assert.equal(elevator.totalStops, 2);
    assert.equal(elevator.totalFloors, 9);
  })

  it('should pick people up in order and drop them off in order', () => {
    assert.equal(elevator.totalStops, 0);
    assert.equal(elevator.totalFloors, 0);

    let mockUser1 = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Sue", currentFloor: 6, dropOffFloor: 2 };
    elevator.goToFloor(mockUser1);
    assert.equal(elevator.totalStops, 2);
    assert.equal(elevator.totalFloors, 11);
    elevator.goToFloor(mockUser2);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 20);
  })

  it('should pick up Person A request before Person B request', () => {
    assert.equal(elevator.totalStops, 0);
    assert.equal(elevator.totalFloors, 0);

    let mockUser1 = { name: "Person A", currentFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Person B", currentFloor: 4, dropOffFloor: 5 };
    elevator.goToFloor(mockUser1);
    elevator.goToFloor(mockUser2);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 17);
  })
  it('Person A goes up, Person B goes up', () => {
    let mockUser1 = { name: "Person A", currentFloor: 3, dropOffFloor: 9 };
    let mockUser2 = { name: "Person B", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser1);
    elevator.goToFloor(mockUser2);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 22);
  })
  it('Person A goes up, Person B goes down', () => {
    let mockUser3 = { name: "Person A", currentFloor: 3, dropOffFloor: 9 };
    let mockUser4 = { name: "Person B", currentFloor: 5, dropOffFloor: 2 };
    elevator.goToFloor(mockUser3);
    elevator.goToFloor(mockUser4);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 19);
  })
  it('Person A goes down, Person B goes up', () => {
    let mockUser5 = { name: "Person A", currentFloor: 3, dropOffFloor: 1 };
    let mockUser6 = { name: "Person B", currentFloor: 1, dropOffFloor: 4 };
    elevator.goToFloor(mockUser5);
    elevator.goToFloor(mockUser6);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 10);
  })
  it('Person A goes down, Person B goes down.', () => {
    let mockUser7 = { name: "Person A", currentFloor: 3, dropOffFloor: 1 };
    let mockUser8 = { name: "Person B", currentFloor: 4, dropOffFloor: 1 };
    elevator.goToFloor(mockUser7);
    elevator.goToFloor(mockUser8);
    assert.equal(elevator.totalStops, 4);
    assert.equal(elevator.totalFloors, 13);
  })
});
