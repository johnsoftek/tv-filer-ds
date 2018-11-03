/**
 * Created by john on 13/12/2013.
 */

module.exports = {
  collect_new,
  move_to_tree
}

const sh = require('child_process')
;(config = require('../config/config')), (tvnamer = config.tvnamer)
//  tvnamer = config.tvnamer_bindir + '/tvnamer';

function collect_new() {
  // Move files from download directory to new tv directory
  // Rename files e.g. Series, Season, Episode
  try {
    sh.execSync(`${tvnamer} -c ${__dirname}/tvnamer.collect_new.json "${config.new_media_in_dir}"`)
  } catch (e) {}
}

function move_to_tree() {
  // Ask tvnamer to move files to the library tree
  try {
    sh.execSync(`${tvnamer} -c ${__dirname}/tvnamer.move_to_tree.json "${config.new_media_temp_dir}"`)
  } catch (e) {}
}
