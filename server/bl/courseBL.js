var dal = require('..//dal/dal');
var parmObject = require('..//dal/spParm');
var model = require('../models/courseModel');


function getCourses(callback) {
    dal.executeQuery('coding-school', 'get_courses', '',function(err, rows) {
        if (err) {
            callback(err);
        }
        const coursesObjectsArray = [];
        rows[0].forEach(function (row) {
            coursesObjectsArray.push(new model.Course(row));
        });
        callback(null, coursesObjectsArray);
    });
}

module.exports.course = {
    getCourses: getCourses
}