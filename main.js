var _ = require('underscore'),
  Q = require('q'),
  fs = require('fs'),
  config = require('./config/config'),
  files = require('./model/files'),
  wl = require('./model/watchlist'),
  qEach = require('./model/qEach');

(function check_files() {

    // Move files from download directory to new tv directory
    // Rename files e.g. Series, Season, Episode
    files.collect_new();

    Q.denodeify(fs.readdir)(config.new_media_temp_dir)
      .then(function(newtv_filenames) {

// execute function list
        // If an episode is not in the watch list, add it

console.log(newtv_filenames)
        qEach(
          newtv_filenames,
          wl.register_file)
          .then(function() {
            files.move_to_tree()
            console.log("Refreshed list at " + new Date());
            process.exit(0)
          }, function (err) {
            console.log('Error adding episodes to database: ', err)
            process.exit(1)          }
        );


        // setTimeout(check_files, config.refresh_secs);
      });

  }
)(); // and run



