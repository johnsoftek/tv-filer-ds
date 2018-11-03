/**
 * Created by john on 8/11/14.
 */
const Q = require('q')

module.exports = function(array, fn) {
  const dfd = Q.defer()
  let index = 0
  ;(function next() {
    const item = array[index]
    if (index >= array.length) {
      dfd.resolve()
      return
    }

    index++
    fn(item).then(next)
  })()

  return dfd.promise
}
