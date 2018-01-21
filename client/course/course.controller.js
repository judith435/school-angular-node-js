schoolApp.controller('courseController', function handleCourses($scope, configSettings, courseService, studentService, canvasService) {
    $scope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';
    $scope.dodo = 'gunibush';
    var lala = $scope.selectedCourse;
    console.log(JSON.stringify(lala));
    console.log($scope.dodo);

   // alert (JSON.stringify($scope.courseSelected));
 
});
