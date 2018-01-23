schoolApp.controller('viewCourseController', function($rootScope, $scope, 
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
    //    var template = $compile($templateCache.get('../cud-course.html'))($scope);
       var template = $compile('../cud-course.html')($scope);
      // element.html($compile('<div ng-include=\'enterprisesMenu.html\'></div>')(scope));   
        angular.element(document.querySelector('#mainPlaceHolder')).append(template); //append your compiled element wherever you want
       // $scope.mainTemplate = '../cud-course.html';
    }
});


