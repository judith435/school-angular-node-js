schoolApp.service('courseService', function($http) {
    
    this.getCourses = function (configSettings, success) { 
        $http.get(configSettings.schoolApi + '/course',{}).then(success, error);
    }

    this.checkDuplicateCourse = function (configSettings, course, success) { 
        $http.get(configSettings.schoolApi + '/course/duplicate', {
            params: {
                course: course 
            }
        }).then(success, error);
    }

    this.addCourse = function(configSettings, course, courseImage, success, error) {
        var fd = new FormData();
        fd.append("courseImage", courseImage);
    
        $http.post(configSettings.schoolApi + '/course', fd,
        {
            contentType: false,
            processData: false,
         //   withCredentials: true,
           headers: {'Content-Type': 'application/x-www-form-urlencoded' }//,
         //   transformRequest: angular.identity
        }).then(success, error); 
    }

    // type: verb,
    // url: app.schoolApi,
    // data: ajaxData,
    // contentType: verb === "POST" ? false : undefined,
    // processData: verb === "POST" ? false : undefined 
  //courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
    this.updateCourse = function(configSettings, course, courseImage, success, error) {
        $http({
            url: configSettings.schoolApi + '/course',
            method: 'PUT',
            params: { course: course } 
        }).then(success, error);
    }


    function error(response) {
        alert("Sorry Error occured in courseService: " + JSON.stringify(response));
    }

    this.buildStudentsForCourse = function(course, students, success) {
        var studentsForCourse = [];
        if (course.studentIDs !== '') {
            var studentsIDs = course.studentIDs.split(","); 
            studentsIDs.forEach(function (studentID) {
                let student = $.grep( students, function(e){ 
                    return e.id ===  parseInt(studentID); 
                });
                studentsForCourse.push({id:studentID, name:student[0].studentName});
            })
        }
        success(studentsForCourse);
    }

});

