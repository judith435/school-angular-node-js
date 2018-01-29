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

function checkDuplicateCourse(req, callback) {

    const course = new model.Course(JSON.parse(req.query.course));

    bl.course.checkDuplicateCourse(course, function(err, courseID) {
        if (err) {
            callback(err);
        }
        callback(null, courseID);
    })
}


function updateCourse(req, callback) {
    console.log('>>> courseController: ' + req.query); // get req.body the body data of get
    const course = new model.Course(JSON.parse(req.query.course));
    
    //perform server side validations on course


    bl.course.updateCourse(course, function(err, result) {
        if (err) {
            callback(err);
        }
        callback(null, result);
    })
}


module.exports.getCourses = getCourses;
module.exports.checkDuplicateCourse = checkDuplicateCourse;
module.exports.updateCourse = updateCourse;
