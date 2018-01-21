schoolApp.controller('courseController', function($rootScope, $scope, $timeout, configSettings, courseService, canvasService) {
    $rootScope.$on('courseSelected', function(event, a) {  
        $scope.selectedCourse = a.course;
      
        console.log('in courseController');
        $scope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';
        $scope.dodo = 'gunibush';

        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas,  
                                configSettings.courseImagePath + $scope.selectedCourse.id, 
                                'regular'); 
        $scope.studentsForCourse = [1, 2, 3];    
        
        
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
    });
    

    $scope.editCourse = function(){
        $scope.mainTemplate = '../cud-course.html';
    }
});


