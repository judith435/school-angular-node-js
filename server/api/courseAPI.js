var courseCtrl = require('../controllers/courseController');

function getCourses(req, res) {
    courseCtrl.getCourses(function(err, courses) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(courses));
    })
}

function addCourse(req, res) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }    
    console.log(req.files);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
 
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });

    courseCtrl.updateCourse(req, function(err, result) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(result));
    })

}


function updateCourse(req, res) {
    // if (!req.files) {
    //     return res.status(400).send('No files were uploaded.');
    // }    
    // console.log(req.files);
    // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let sampleFile = req.files.file;
 
    // // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    //     if (err)
    //     return res.status(500).send(err);
    
    //     res.send('File uploaded!');
    // });

    console.log('>>> courseAPI: ' + req.query);
    courseCtrl.updateCourse(req, function(err, result) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(result));
    })
}

module.exports.getCourses = getCourses;
module.exports.addCourse = addCourse;
module.exports.updateCourse = updateCourse;
