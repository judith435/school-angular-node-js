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

function checkDuplicateCourse(course, callback) { 

    console.log('>>> courseBL: ' + JSON.stringify(course));  

    const spParms = []; 
    
    spParms.push(new parmObject.spParm(course.courseName, true));

    console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    dal.executeQuery('coding-school', 'check_course_exists', spParms, function(err, rows) {
        if (err) {
            callback(err);
        }

        rows[0].forEach(function (row) {
            callback(null, row.duplicateCourseID);
        });

    });
}


function updateCourse(course, callback) { 

    console.log('>>> courseBL: ' + JSON.stringify(course));  

    const spParms = []; 
    
    spParms.push(new parmObject.spParm(course.id, false));
    spParms.push(new parmObject.spParm(course.courseName, true));
    spParms.push(new parmObject.spParm(course.courseDescription, true));

    console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    dal.executeQuery('coding-school', 'update_course', spParms, function(err, rows) {
        if (err) {
            callback(err);
        }
        callback(null, 'course updated successfully');
    });
}



module.exports.course = {
    getCourses: getCourses,
    checkDuplicateCourse: checkDuplicateCourse,
    updateCourse: updateCourse

}