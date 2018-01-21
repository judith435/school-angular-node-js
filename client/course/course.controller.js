schoolApp.controller('courseController', function handleCourses($scope, configSettings, courseService, studentService, canvasService) {
    $scope.courseSummary = $scope.selectedCourse.courseName + ', ' + $scope.selectedCourse.numberOfStudentsForCourse + ' students';
   
   
    var lala = $scope.selectedCourse;
    console.log(JSON.stringify(lala));
   // alert (JSON.stringify($scope.courseSelected));
 
});
