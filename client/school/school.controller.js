schoolApp.controller('schoolController', function handleSchoolLoad($scope, courseService, studentService) {

    getCourses();
    getStudents();

    function getCourses() {
        courseService.getCourses(function(courses) {
            const crs = courses.data;
            $scope.keys = Object.keys(crs[0]);
            $scope.courses = (courses.data);
        });
    }

    function getStudents() {
        studentService.getStudents(function(students) {
            const stdnts = students.data;
            $scope.keys = Object.keys(stdnts[0]);
            $scope.students = (students.data);
        });
    }

});
