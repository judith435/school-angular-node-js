schoolApp.controller('viewCourseController', function($rootScope, $scope, $timeout, configSettings, courseService, canvasService) {
    setTemplate($scope.course, $scope.studentsForCourse);

    $rootScope.$on('handleCourseSelection', function(event, parms) {  
        setTemplate(parms.course, parms.studentsForCourse);
    });
    
    function setTemplate(course, studentsForCourse) {

        $rootScope.selectedCourse = course;
        $rootScope.courseSummary = $rootScope.selectedCourse.courseName + ', ' + $rootScope.selectedCourse.numberOfStudentsForCourse + ' students';

        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas,  
                                configSettings.courseImagePath + $rootScope.selectedCourse.id, 
                                'regular'); 
        console.log(JSON.stringify(studentsForCourse));
    }

    $scope.editCourse = function(){
        $scope.mainTemplate = '../cud-course.html';
    }
});


