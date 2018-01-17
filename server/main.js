var express = require('express');
var bodyParser = require("body-parser");

// var apiProducts = require('./api/productAPI.js');
// var apiSuppliers = require('./api/supplierAPI.js');
// var apiCategories = require('./api/categoryAPI.js');

var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../client'));
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

// app.get('/product', apiProducts.getProducts);
// app.get('/product/duplicate', apiProducts.checkDuplicateProduct);
// app.get('/supplier', apiSuppliers.getSuppliers);
// app.get('/supplier/ddl', apiSuppliers.getSuppliersDDL);
// app.get('/category/ddl', apiCategories.getCategoriesDDL);

// app.post('/product', apiProducts.addProduct);
// Start the server
var server = app.listen(8082, function () {

})