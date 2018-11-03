/**
 * Created by john on 7/12/2013.
 */

const axios = require('axios')

const Q = require('q')
const hash_id = require('./hash-id')

const config = require('../config/config')

function register_file(filename) {
  const deferred = Q.defer()
  const file_id = hash_id.encode(filename.toLowerCase()) // get safe id

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
        console.log(`http status = ${response.status} ${JSON.stringify(response.body)}`)
        if (response.status === 422) {
          deferred.resolve(response.body)
        } else {
          deferred.reject(new Error(`http status = ${response.status}`))
        }
      }
    })

  return deferred.promise
}

module.exports = {
  register_file
}
