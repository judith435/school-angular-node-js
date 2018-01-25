schoolApp.controller('editCourseController', function($rootScope, $scope, $timeout, configSettings, courseService, canvasService) {

    angular.element(function () {
        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas, configSettings.courseImagePath + $scope.selectedCourse.id,'regular'); 
    });

});
