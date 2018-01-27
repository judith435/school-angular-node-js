var express = require('express');
var bodyParser = require("body-parser");

var apiCourse = require('./api/courseAPI.js');
var apiStudent = require('./api/studentAPI.js');

var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../client'));
app.use(express.static('../client/school'));
app.use(express.static('../client/course'));
app.use(express.static('../images/admins'));
app.use(express.static('../images/courses'));
app.use(express.static('../images/students'));
app.use(express.static('../node_modules'));

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
app.get('/student', apiStudent.getStudents);
app.put('/course', apiCourse.updateCourse);

// app.get('/product/duplicate', apiProducts.checkDuplicateProduct);
// app.get('/supplier', apiSuppliers.getSuppliers);
// app.get('/supplier/ddl', apiSuppliers.getSuppliersDDL);
// app.get('/category/ddl', apiCategories.getCategoriesDDL);

// app.post('/product', apiProducts.addProduct);
// Start the server
var server = app.listen(8082, function () {

})