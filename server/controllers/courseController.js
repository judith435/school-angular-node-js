var bl = require('../bl/courseBL');
var model = require('../models/courseModel');


function getCourses(callback) {

    bl.course.getCourses(function(err, courseArray) {
        if (err) {
            callback(err);
        }
        callback(null, courseArray);
    })
}

module.exports.getCourses = getCourses;
