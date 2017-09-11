import { ref } from '../config/constants'
import _ from 'lodash';

export function retrieveSquares (callback) {
  ref.child('squares').on('value', (snapshot) =>  {
    callback(_.without(snapshot.val(), undefined));
  });
}