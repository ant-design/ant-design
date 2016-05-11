/* eslint-disable */
var originReport = require('lesshint/lib/reporters/stylish').report;

module.exports = {
  report: function (errors) {
    // Use full path
    errors.forEach(function(error) {
      error.file = error.fullPath;
    });
    originReport(errors);
  }
};
