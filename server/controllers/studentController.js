var bl = require('../bl/studentBL');
var model = require('../models/studentModel');


function getStudents(callback) {

    bl.student.getStudents(function(err, studentArray) {
        if (err) {
            callback(err);
        }
        callback(null, studentArray);
    })
}

module.exports.getStudents = getStudents;
