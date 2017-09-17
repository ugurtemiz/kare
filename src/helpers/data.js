import { ref } from '../config/constants'

export function retrieveSquares (callback) {
  ref.child('squares').on('value', (snapshot) =>  {
    var items = [];
    snapshot.forEach((child) => {
      items.push({
        name : child.val().name,
        quantity : child.val().quantity,
        key : child.key
      });
    });
    callback(items);
  });
}

export function updateQuantity (tstamp, name, quantity) {
  tstamp = tstamp == null ? Date.now() : tstamp;
  ref.child('squares/' + tstamp + '/').set({
    name : name,
    quantity : ++quantity
  });
}

export function addSquare (name) {
  var tstamp = Date.now();
  ref.child('squares/' + tstamp + '/').set({
    name : name,
    quantity : 0,
    key : tstamp
  });
}

export function dailyExport (exportJson, callback) {
  ref.child('reports/' + Date.now() + '/').set(exportJson, (error) => {
    if (!error) {
      callback();
    }
  });
}

export function resetQuantities (squares, callback) {
  squares.forEach((square) => {
    square.quantity = 0;
  });
  ref.child('squares').set(squares, (error) => {
    if (!error) {
      callback();
    }
  });
}