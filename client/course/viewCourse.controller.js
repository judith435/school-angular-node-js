schoolApp.controller('viewCourseController', function($rootScope, $scope, $timeout, configSettings, courseService, canvasService) {
    setTemplate($scope.course, $scope.studentsForCourse);

    $rootScope.$on('handleCourseSelection', function(event, parms) {  
        setTemplate(parms.course, parms.studentsForCourse);

        // $scope.$on('studentsForCourseLoaded', function(ngRepeatFinishedEvent) {
        //     $scope.studentsForCourse.forEach(function (studi) {
        //         var XdrawingCanvas = document.getElementById('canvas-student-' + studi.id );
        //         canvasService.setCanvas(XdrawingCanvas,  
        //         configSettings.studentImagePath + studi.id, 
        //         'small'); 
        //     });
        // });
    });
    
    function setTemplate(course, studentsForCourse) {

        $rootScope.selectedCourse = course;
        $rootScope.courseSummary = $rootScope.selectedCourse.courseName + ', ' + $rootScope.selectedCourse.numberOfStudentsForCourse + ' students';

        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas,  
                                configSettings.courseImagePath + $rootScope.selectedCourse.id, 
                                'regular'); 
        // $scope.studentsForCourse = [1, 2, 3];    
        // $scope.studentsForCourse = [];
        
        // var students = $rootScope.selectedCourse.studentIDs.split(","); 
        // students.forEach(function (studentID) {
        //     let student = $.grep( $scope.students, function(e){ 
        //         return e.id ===  parseInt(studentID); 
        //     });
        //     $scope.studentsForCourse.push({id:studentID, 
        //         name:student[0].studentName,
        //         imagePath: configSettings.studentImagePath + studentID });
        // });
        // console.log(JSON.stringify($scope.studentsForCourse));
    }


    $scope.editCourse = function(){
        $scope.mainTemplate = '../cud-course.html';
    }
});


