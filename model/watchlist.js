/**
 * Created by john on 7/12/2013.
 */

var axios = require('axios'),
  hash_id = require('./hash-id'),
  config = require('../config/config'),
  Q = require('q');

exports = module.exports = {
  register_file: register_file
};

function register_file(filename) {
  var deferred = Q.defer();
  var file_id = hash_id.encode(filename.toLowerCase()); // get safe id

  axios.post('http://' + config.rest_url + '/api/episodes/registerfile',
    { 'filename': filename },
    {
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
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



