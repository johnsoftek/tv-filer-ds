/**
 * Created by john on 7/12/2013.
 */

var unirest = require('unirest'),
  hash_id = require('./hash-id'),
  Q = require('q');

exports = module.exports = {
  register_file:      register_file
};

function register_file(filename) {
  var deferred = Q.defer();
  var file_id = hash_id.encode(filename.toLowerCase()); // get safe id

  unirest.post('http://127.0.0.1:3000/api/episodes/registerfile')
    .headers({ 'Accept': 'application/json' })
    .type('json')
    .send({'filename': filename
  })
  .end(function (response) {
      if (response.status === 200 ||
          response.status === 204) {
        deferred.resolve(response.body)
      } else {
        console.log('http status = ' + response.status + ' ' + JSON.stringify(response.body))
        if (response.status === 422) {
          deferred.resolve(response.body)
        } else {
          deferred.reject(new Error('http status = ' + response.status))
        }
      }
  });

  return deferred.promise

}



