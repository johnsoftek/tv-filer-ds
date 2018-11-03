/**
 * Created by john on 8/11/14.
 */
var Q = require('q');

module.exports = function(array, fn){

  var dfd = Q.defer();
  var index = 0;

  (function next(){
    var item = array[index];
    if(index >= array.length) {
      dfd.resolve();
      return;
    }

    index++;
    fn(item).then(next);

  })();

  return dfd.promise;

};

