schoolApp.controller('viewCourseController', function($rootScope, 
    $scope, 
    $templateRequest,
    $compile, 
    $templateCache,   
    $timeout, 
    configSettings, 
    courseService, 
    canvasService) {

    $rootScope.$on('$includeContentLoaded', function(){
     //   alert ('viewCourseController includeContentLoaded');
    });
    

    setTemplate($scope.course, $scope.studentsForCourse);

    $rootScope.$on('handleCourseSelection', function(event, parms) {  
        setTemplate(parms.course, parms.studentsForCourse);
    });
    
    function setTemplate(course, studentsForCourse) {

        $scope.selectedCourse = course;
        $rootScope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';

        var drawingCanvas = document.getElementById('canvasCourse');
        if (drawingCanvas) {
        canvasService.setCanvas(drawingCanvas,  
                                configSettings.courseImagePath + $scope.selectedCourse.id, 
                                'regular'); 
        }
        console.log(JSON.stringify(studentsForCourse));
    }

    $scope.editCourse = function(){
        $scope.course = $scope.selectedCourse;
       // $scope.mainTemplate = '../cud-course.html'; 
        $templateRequest("../cud-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
            $rootScope.updateCourse = true;
        });
    }
});
