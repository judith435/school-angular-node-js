var courseCtrl = require('../controllers/courseController');

function getCourses(req, res) {
    courseCtrl.getCourses(function(err, courses) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(courses));
    })
}
