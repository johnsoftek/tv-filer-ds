/**
 * Created by john on 7/12/2013.
 */

let axios = require('axios')

let hash_id = require('./hash-id')

let config = require('../config/config')

let Q = require('q')

function register_file(filename) {
  let deferred = Q.defer()
  let file_id = hash_id.encode(filename.toLowerCase()) // get safe id

  axios
    .post(
      `http://${config.rest_url}/api/episodes/registerfile`,
      { filename },
      {
        headers: { Accept: 'application/json' }
      }
    )
    .then(response => {
      if (response.status === 200 || response.status === 204) {
        deferred.resolve(response.body)
      } else {
        console.log('http status = ' + response.status + ' ' + JSON.stringify(response.body))
        if (response.status === 422) {
          deferred.resolve(response.body)
        } else {
          deferred.reject(new Error('http status = ' + response.status))
        }
      }
    })

  return deferred.promise
}

module.exports = {
  register_file
}
