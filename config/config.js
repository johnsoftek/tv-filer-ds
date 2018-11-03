/**
 * Created by john on 7/12/2013.
 */

var config = {
	media_dir: '/volume1/TV_Series',
    new_media_in_dir: '/volume1/TV_Series/_New',
    new_media_temp_dir: '/volume1/TV_Series/-New',
    rest_url: '192.168.0.16:3000',
    tvnamer: 'python tvnamer/main.py',
    refresh_secs:  900000
};

exports = module.exports = config;

