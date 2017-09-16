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

export function updateQuantity (tstamp, name, quantity, callback) {
  tstamp = tstamp == null ? Date.now() : tstamp;
  ref.child('squares/' + tstamp + '/').set({
    name : name,
    quantity : ++quantity
  });
}