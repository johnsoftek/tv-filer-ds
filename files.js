/**
 * Created by john on 13/12/2013.
 */

exports = module.exports = {
  collect_new,
  move_to_tree
}

const sh = require('execSync')

const config = require('../config/config')

const tvnamer = `${config.tvnamer_bindir}/tvnamer`

function collect_new() {
  // Move files from download directory to new tv directory
  // Rename files e.g. Series, Season, Episode
  sh.run(`${tvnamer} -c ${__dirname}/tvnamer.collect_new.json "${config.new_media_in_dir}"`)
}

function move_to_tree() {
  // Ask tvnamer to move files to the library tree
  sh.run(`${tvnamer} -c ${__dirname}/tvnamer.move_to_tree.json "${config.new_media_temp_dir}"`)
}
