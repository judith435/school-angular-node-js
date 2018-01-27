var courseCtrl = require('../controllers/courseController');

function getCourses(req, res) {
    courseCtrl.getCourses(function(err, courses) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(courses));
    })
}

function updateCourse(req, res) {
    console.log('>>> courseAPI: ' + req.query);
    courseCtrl.updateCourse(req, function(err, result) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(result));
    })
}

module.exports.getCourses = getCourses;
module.exports.updateCourse = updateCourse;
