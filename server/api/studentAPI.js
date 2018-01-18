var studentCtrl = require('../controllers/studentController');

function getStudents(req, res) {
    studentCtrl.getStudents(function(err, students) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(students));
    })
}

module.exports.getStudents = getStudents;
