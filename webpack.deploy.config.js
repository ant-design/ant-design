var config = require('./webpack.config');
delete config.entry.index;
module.exports = config;
