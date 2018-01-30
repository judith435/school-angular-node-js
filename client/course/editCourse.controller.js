schoolApp.controller('editCourseController', function($rootScope, 
    $scope, 
    $timeout, 
    $templateRequest,
    $compile, 
    configSettings, 
    courseService, 
    imageService) {
    // if ($rootScope.updateCourse) {
    //     sessionStorage.setItem("courseBeforeChange", JSON.stringify($scope.course));   
    // }

    $scope.form = {
        name : "frmCUD", 
        fields :
        [
            {
                name:'courseName',
                index: 0,
                content: '',
                description: 'Course Name',
                required: true,
                type: 'text',
                maxlength: 45,
                errorFound: false,
                errorMessage: '',
            },
            {
                name:'courseDescription',
                index: 1,
                description: 'Course Description',
                required: true,
                content: '',
                type: 'textarea',
                maxlength: 255,
                errorMessage: ''
            }
        ]
    }

    // if ($rootScope.updateCourse) {
    //     $scope.form.fields.forEach(function(field) {
    //         field.content = $scope.course[field.name];
    //     });
    // }

    angular.element(function () {
        if ($rootScope.updateCourse) {
            var drawingCanvas = document.getElementById('canvasCourse');
            imageService.setCanvas(drawingCanvas, configSettings.courseImagePath + $scope.selectedCourse.id,'regular'); 
            sessionStorage.setItem("courseBeforeChange", JSON.stringify($scope.course));   
        }
    });

    $scope.uploadedCourseImage = function(fu) {
        $scope.$apply(function($scope) {
          $scope.courseImage = fu.files;    
          var drawingCanvas = document.getElementById('canvasCourse');
          imageService.uploadImage(drawingCanvas, fu.files); 
        });
    }

    $scope.clearImage = function()  {
        if ($scope.courseImage) {
            angular.element("#courseImage").val(null);
            $scope.courseImage = null;
            var drawingCanvas = document.getElementById('canvasCourse');
            imageService.clearImage(drawingCanvas); 
        }
    }

    $scope.saveCourse = function()  {

        // $scope.form.fields.forEach(function(field) {
        //     field.errorMessage = (!field.content)  && field.required ? field.description + ' required' : '';
        //     $scope.errorsFound = field.errorMessage !== '' || $scope.errorsFound;
        // });

       // $scope.courseName_errorMessage = !$scope.course.courseName ? 'Course Name required' : '';
      //  $scope.errorsFound = $scope.courseName_errorMessage !== '' || $scope.errorsFound;

        //let index = 0;
        var course = {
            id: $scope.course.id,
            courseName: $scope.course.courseName,
            courseDescription: $scope.course.courseDescription
        };

        validateInput();

        if ($scope.errorsFound) { return; }
        alert ('no errors found!!!');


        if ($rootScope.updateCourse) {
            courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
              
                if (response.data === 'course updated successfully') {
                    $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
                }
                    //$scope.message = (JSON.stringify(response.data));
            });
        } 
        else {
            courseService.addCourse(configSettings, course, $scope.courseImage, function(response) {
                //courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
                alert  (JSON.stringify(response.data));
                if (response.data === 'course updated successfully') {
                   $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
                }
                //$scope.message = (JSON.stringify(response.data));
            });
        }
        
        courseService.buildStudentsForCourse($scope.course, $scope.students, function(studentsForCourse) {
            $scope.studentsForCourse = studentsForCourse;
        });

        $templateRequest("../view-course.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
            angular.element(function () {
                $rootScope.$broadcast('handleCourseSelection', {course: $scope.course, studentsForCourse: $scope.studentsForCourse});
            });
        });
    }  

    function validateInput() {
        $scope.errorsFound = false;

        if ($rootScope.updateCourse) {
            var data = sessionStorage.getItem("courseBeforeChange");
            var courseBeforeChange = JSON.parse(data);

            if (courseBeforeChange.courseName === $scope.course.courseName && 
                courseBeforeChange.courseDescription === $scope.course.courseDescription) {
                    $scope.duplicateCourse_errorMessage =  'no change in data - no update';  
                    $scope.errorsFound = true;
                    return;
            }  
        }

        $scope.courseName_errorMessage = !$scope.course.courseName ? 'Course Name required' : '';
        $scope.errorsFound = $scope.courseName_errorMessage !== '' || $scope.errorsFound;
        $scope.courseDescription_errorMessage = !$scope.course.courseDescription ? 'Course Description required' : '';
        $scope.errorsFound = $scope.courseDescription_errorMessage !== '' || $scope.errorsFound;

        if ($scope.courseImage) {

            var extension = $scope.courseImage[0].name.split(".").pop().toLowerCase();
            $scope.courseImage_errorMessage = $.inArray(extension, ['jpg', 'jpeg', 'png', 'gif']) === -1 ? 'Valid extensions: jpg, jpeg, png or gif' : '';
            $scope.errorsFound = $scope.courseImage_errorMessage !== '' || $scope.errorsFound;
    
            if ($scope.courseImage_errorMessage !== '') {
                return;
            }
    
            $scope.courseImage_errorMessage = $scope.courseImage[0].size > 5000000 ? "Image larger than 5MB - actual size: " + $scope.courseImage[0].size + " bytes" : '';
            $scope.errorsFound = $scope.courseImage_errorMessage !== '' || $scope.errorsFound;
        }

        if ($scope.courseName_errorMessage !== '' ) { //course name missing - no point checking duplicate cours
            return;
        }

        courseService.checkDuplicateCourse(configSettings, $scope.course, function(response) {
            let duplicateCourseID = parseInt(response.data);
            $scope.errorsFound = duplicateCourseID !== -1;
            $scope.duplicateCourse_errorMessage =  duplicateCourseID !== -1 
                    ? 'course with same name already exists (courseID: ' + duplicateCourseID + ')' : '' ;
        });
    }    



});


