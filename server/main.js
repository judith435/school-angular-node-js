var express = require('express');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');

var apiCourse = require('./api/courseAPI.js');
var apiStudent = require('./api/studentAPI.js');

var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('../client'));
app.use(express.static('../client/school'));
app.use(express.static('../client/course'));
app.use(express.static('../images/admins'));
app.use(express.static('../images/courses'));
app.use(express.static('../images/students'));
app.use(express.static('../node_modules'));

const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')))

// Listen to '/' in GET Verb methods - serve the main Angular index.html file
app.get('/', function (req, res) {

    fs.readFile('client/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.end(data) 
    });
   
});

app.get('/course', apiCourse.getCourses);
app.get('/course/duplicate', apiCourse.checkDuplicateCourse);
app.post('/course', apiCourse.addCourse);
app.put('/course', apiCourse.updateCourse);


app.get('/student', apiStudent.getStudents);

// app.post('/upload', function(req, res) {
//     if (!req.files)
//       return res.status(400).send('No files were uploaded.');
   
//       console.log(req.files);
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.file;
   
//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
//       if (err)
//         return res.status(500).send(err);
   
//       res.send('File uploaded!');
//     });
//   });
  
// app.get('/product/duplicate', apiProducts.checkDuplicateProduct);
// app.get('/supplier', apiSuppliers.getSuppliers);
// app.get('/supplier/ddl', apiSuppliers.getSuppliersDDL);
// app.get('/category/ddl', apiCategories.getCategoriesDDL);

// app.post('/product', apiProducts.addProduct);
// Start the server
var server = app.listen(8082, function () {

})