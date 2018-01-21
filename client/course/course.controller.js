schoolApp.controller('courseController', function handleCourses($scope, $timeout, configSettings, courseService, canvasService) {
    courseSelected();
    $scope.$on('courseSelected', courseSelected);
    //courseSelected();
    function courseSelected(e) {  
        console.log('in courseController');
        $scope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';
        $scope.dodo = 'gunibush';
        var lala = $scope.selectedCourse;
        console.log(JSON.stringify(lala));
        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas,  
                                configSettings.courseImagePath + $scope.selectedCourse.id, 
                                'regular'); 
        $scope.studentsForCourse = [];    
        var students = $scope.selectedCourse.studentIDs.split(","); 
        students.forEach(function (studentID) {
            let student = $.grep( $scope.students, function(e){ 
                return e.id ===  parseInt(studentID); 
            });
            $scope.studentsForCourse.push({id:studentID, 
                name:student[0].studentName,
                imagePath: configSettings.studentImagePath + studentID });
        });
        console.log(JSON.stringify($scope.studentsForCourse));
        
        // $scope.$on('studentsForCourseLoaded', function(ngRepeatFinishedEvent) {
        //     $scope.studentsForCourse.forEach(function (studi) {
        //         var XdrawingCanvas = document.getElementById('canvas-student-' + studi.id );
        //         canvasService.setCanvas(XdrawingCanvas,  
        //         configSettings.studentImagePath + studi.id, 
        //         'small'); 
        //     });
        // });
    }

    $scope.editCourse = function(){
        $scope.mainTemplate = '../cud-course.html';
    }
});


