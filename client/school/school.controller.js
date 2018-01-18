schoolApp.controller('schoolController', function handleSchoolLoad($scope, configSettings, courseService, studentService, canvasService) {

    getCourses();
    getStudents();

    function getCourses() {
        courseService.getCourses(configSettings, function(courses) {
            const crs = courses.data;
            $scope.keys = Object.keys(crs[0]);
            $scope.courses = (courses.data);
            $scope.totalCourses = 'Total number of Courses: ' + courses.data.length;
        });
    }

    
    function loadCourseCanvas() {
        $scope.courses.forEach(function (course) {
            var drawingCanvas = document.getElementById('canvas-course-' + course.courseID);
           // alert ('$location.path() ' + $location.path());
            canvasService.setCanvas(drawingCanvas, configSettings.courseImagePath + course.courseID, 'schoolAside');
        });
    }

    // var drawingCanvas = document.getElementById($scope.idImage);
    // var context = drawingCanvas.getContext('2d');
    // context.drawImage($scope.idImage, 0, 0, 40, 50);

  //  context.drawImage($scope.idImage, $scope.coordinate.x, $scope.coordinate.y, $scope.coordinate.w, $scope.coordinate.h);
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


    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        loadCourseCanvas();
    });


});
