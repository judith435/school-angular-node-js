schoolApp.controller('viewCourseController', function($rootScope, 
    $scope, 
    $templateRequest,
    $compile, 
    $templateCache,   
    $timeout, 
    configSettings, 
    courseService, 
    imageService) {

    setTemplate($scope.course, $scope.studentsForCourse);

    $rootScope.$on('handleCourseSelection', function(event, parms) {  
        setTemplate(parms.course, parms.studentsForCourse);
    });
    
    function setTemplate(course, studentsForCourse) {

        $scope.selectedCourse = course;
        $rootScope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';

        angular.element(function () {
            var drawingCanvas = document.getElementById('canvasCourse');
            imageService.setCanvas(drawingCanvas, configSettings.courseImagePath + $scope.selectedCourse.id,'regular'); 
            imageService.loadCanvasList(studentsForCourse, 'canvas-student-for-course-' , configSettings.studentImagePath, 'small'); 
        });
        console.log(JSON.stringify(studentsForCourse));
    }

    $scope.editCourse = function(){
        $scope.course = $scope.selectedCourse;
        $templateRequest("../cud-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
            $rootScope.updateCourse = true;
        });
    }
});
