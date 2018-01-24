schoolApp.controller('viewCourseController', function($rootScope, $scope, $templateRequest,
    $compile, $templateCache,   $timeout, configSettings, courseService, canvasService) {
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
        $templateRequest("../cud-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().replaceWith(template);
        });
    }
});

//$( "#result" ).load( "ajax/test.html" );

// link: function(scope, element){
//     $templateRequest("template.html").then(function(html){
//        var template = angular.element(html);
//        element.append(template);
//        $compile(template)(scope);
//     });
//  };

