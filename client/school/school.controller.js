schoolApp.controller('schoolController', function handleSchoolLoad($rootScope, 
    $scope, 
    $templateRequest,
    $compile, 
    configSettings, 
    courseService,
    studentService, 
    imageService) {

    $scope.courseAsideTemplate = '../courseAside.html';
    $scope.studentAsideTemplate = '../studentAside.html';
    $scope.mainTemplate = '../schoolMain.html';
    buildSchoolAside();

    function buildSchoolAside() {
            getCourses();
            getStudents();
    }    

    function getCourses() {
        courseService.getCourses(configSettings, function(courses) {
            const crs = courses.data;
            $scope.keys = Object.keys(crs[0]);
            $scope.courses = (courses.data);
            $scope.totalCourses = 'Total number of Courses: ' + courses.data.length;
        });
    }

    function getStudents() {
        studentService.getStudents(configSettings, function(students) {
            const stdnts = students.data;
            $scope.keys = Object.keys(stdnts[0]);
            $scope.students = (students.data);
            $scope.totalStudents = "Total number of Students: " + students.data.length
        });
    }

    $scope.$on('ngSchoolRepeatFinished', function(ngSchoolRepeatFinishedEvent) {
        imageService.loadCanvasList($scope.courses, 'canvas-course-' , configSettings.courseImagePath, 'schoolAside'); 
        imageService.loadCanvasList($scope.students, 'canvas-student-' , configSettings.studentImagePath, 'schoolAside'); 
    });


    $scope.courseSelected = function(course){

        $scope.studentsForCourse = [];
        $scope.course = course;
        courseService.buildStudentsForCourse(course, $scope.students, function(studentsForCourse) {
            $scope.studentsForCourse = studentsForCourse;
        });
        
        $templateRequest("../view-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
            angular.element(function () {
                $rootScope.$broadcast('handleCourseSelection', {course: course, studentsForCourse: $scope.studentsForCourse});
            });
        });
    }

    $scope.addCourse = function(){
       $rootScope.updateCourse = false;
       $scope.course = {};
        $templateRequest("../cud-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
        });
    }

    $scope.studentSelected = function(student){
        // alert(JSON.stringify(student));
    }

    $rootScope.$on('refreshAfterCourseStudentUpdate', function(event) {  
        buildSchoolAside();
    });

});
