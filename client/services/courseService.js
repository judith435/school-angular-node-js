schoolApp.service('courseService', function($http, $q) {
    
    this.getCourses = function (configSettings, success) { 
        $http.get(configSettings.schoolApi + '/course',{}).then(success, error);
    }

    this.addCourse = function(configSettings, course, courseImage, success, error) {
        var fd = new FormData();
        fd.append("courseImage", courseImage);
    
        $http.post(configSettings.schoolApi + '/course', fd,
        {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(success, error); 
    }

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

    this.buildStudentsForCourse = function(course, students) {
        var studentsForCourse = [];
        var studentsIDs = course.studentIDs.split(","); 
        studentsIDs.forEach(function (studentID) {
            let student = $.grep( students, function(e){ 
                return e.id ===  parseInt(studentID); 
            });
            studentsForCourse.push({id:studentID, name:student[0].studentName});
        });

        var deferral = $q.defer(); 
        deferral.resolve({studentsForCourse});
        return deferral.promise;
    }

});

