var dal = require('..//dal/dal');
var parmObject = require('..//dal/spParm');
var model = require('../models/studentModel');


function getStudents(callback) {
    dal.executeQuery('school', 'get_students', '',function(err, rows) {
        if (err) {
            callback(err);
        }
        const studentsObjectsArray = [];
        rows[0].forEach(function (row) {
            studentsObjectsArray.push(new model.Student(row));
        });
        callback(null, studentsObjectsArray);
    });
}

module.exports.student = {
    getStudents: getStudents
}