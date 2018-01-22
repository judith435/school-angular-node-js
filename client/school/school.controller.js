schoolApp.controller('schoolController', function handleSchoolLoad($rootScope, $scope, configSettings, courseService, studentService, canvasService) {

   $scope.courseAsideTemplate = '../courseAside.html';
   $scope.studentAsideTemplate = '../studentAside.html';
   $scope.mainTemplate = '../schoolMain.html';

    getCourses();
    getStudents();

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

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        canvasService.loadCanvasList($scope.courses, 'canvas-course-' , configSettings.courseImagePath, 'schoolAside'); 
        canvasService.loadCanvasList($scope.students, 'canvas-student-' , configSettings.studentImagePath, 'schoolAside'); 
    });


    $scope.courseSelected = function(course){

        $scope.studentsForCourse = [];
        
        var students = course.studentIDs.split(","); 
        students.forEach(function (studentID) {
            let student = $.grep( $scope.students, function(e){ 
                return e.id ===  parseInt(studentID); 
            });
            $scope.studentsForCourse.push({id:studentID, 
                name:student[0].studentName,
                imagePath: configSettings.studentImagePath + studentID });
        });
        console.log(JSON.stringify($scope.studentsForCourse));

        $scope.course = course;
        $scope.mainTemplate = '../view-course.html';
        $rootScope.$broadcast('handleCourseSelection', {course: course, studentsForCourse: $scope.studentsForCourse});
    }

    $scope.addCourse = function(){
        $scope.updateCourse = false;
        $scope.mainTemplate = '../cud-course.html';
    }

    $scope.studentSelected = function(student){
        // alert(JSON.stringify(student));
    }


});
