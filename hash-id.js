/**
 * Created by john on 23/11/2013.
 */

const encode_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-'.split('')

exports.encode = function(s) {
  // the result/encoded string, the padding string, and the pad count
  let r = ''
  let c = s.length % 3

  // add a right zero pad to make this string a multiple of 3 characters
  if (c > 0) {
    for (; c < 3; c++) {
      s += '\0'
    }
  }

  // increment over the length of the string, three characters at a time
  for (c = 0; c < s.length; c += 3) {
    // these three 8-bit (ASCII) characters become one 24-bit number
    let n = (s.charCodeAt(c) << 16) + (s.charCodeAt(c + 1) << 8) + s.charCodeAt(c + 2)

    // this 24-bit number gets separated into four 6-bit numbers
    n = [(n >>> 18) & 63, (n >>> 12) & 63, (n >>> 6) & 63, n & 63]

    // those four 6-bit numbers are used as indices into the base64 character list
    r += encode_chars[n[0]] + encode_chars[n[1]] + encode_chars[n[2]] + encode_chars[n[3]]
  }
  // add the actual padding string, after removing the zero pad
  return r
}
