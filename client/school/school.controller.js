schoolApp.controller('schoolController', function handleSchoolLoad($scope, configSettings, courseService, studentService) {

    getCourses();
    getStudents();

    function getCourses() {
        courseService.getCourses(configSettings, function(courses) {
            const crs = courses.data;
            $scope.keys = Object.keys(crs[0]);
            $scope.courses = (courses.data);
            $scope.totalCourses = "Total number of Courses: " + courses.data.length
        });
    }

    // var drawingCanvas = document.getElementById($scope.idImage);
    // var context = drawingCanvas.getContext('2d');
    // context.drawImage($scope.idImage, $scope.coordinate.x, $scope.coordinate.y, $scope.coordinate.w, $scope.coordinate.h);

    // function setCanvas(canvas, imgPath, size) {
    //     var context = canvas.getContext("2d");
    //     var imageObj = new Image();
    //     imageObj.onload = function() {
    //           context.drawImage(imageObj, 0, 0, canvasSize[size][0], canvasSize[size][1]);
    //     };
    //     imageObj.src = imgPath;
    // }



    function getStudents() {
        studentService.getStudents(configSettings, function(students) {
            const stdnts = students.data;
            $scope.keys = Object.keys(stdnts[0]);
            $scope.students = (students.data);
            $scope.totalStudents = "Total number of Students: " + students.data.length
        });
    }

});
