schoolApp.controller('editCourseController', function($rootScope, $scope, $timeout, configSettings, courseService, canvasService) {
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
        var drawingCanvas = document.getElementById('canvasCourse');
        canvasService.setCanvas(drawingCanvas, configSettings.courseImagePath + $scope.selectedCourse.id,'regular'); 
        if ($rootScope.updateCourse) {
            sessionStorage.setItem("courseBeforeChange", JSON.stringify($scope.course));   
        }

    });

    $scope.uploadedCourseImage = function(fu) {
        alert('in uploadedCourseImage');
        $scope.$apply(function($scope) {
          $scope.courseImage = fu.files;         
        });
    }

    $scope.saveCourse = function()  {
        $scope.errorsFound = false;

        // $scope.form.fields.forEach(function(field) {
        //     field.errorMessage = (!field.content)  && field.required ? field.description + ' required' : '';
        //     $scope.errorsFound = field.errorMessage !== '' || $scope.errorsFound;
        // });
        if ($rootScope.updateCourse) {
            var data = sessionStorage.getItem("courseBeforeChange");
            var courseBeforeChange = JSON.parse(data);

            $scope.duplicateCourse_errorMessage = courseBeforeChange.courseName === $scope.course.courseName && 
                                                  courseBeforeChange.courseDescription === $scope.course.courseDescription
                ? 'no change in data - no update'  :     '' ;
            $scope.errorsFound = $scope.duplicateCourse_errorMessage !== '';
        }

       // $scope.courseName_errorMessage = !$scope.course.courseName ? 'Course Name required' : '';
      //  $scope.errorsFound = $scope.courseName_errorMessage !== '' || $scope.errorsFound;

        if ($scope.errorsFound) { return; }
        alert ('no errors found!!!');

        //let index = 0;
        var course = {
            id: $scope.course.id,
            courseName: $scope.course.courseName,
            courseDescription: $scope.course.courseDescription
        };

        // $scope.duplicateProductErrorMessage = '';
        // if (!productService.checkDuplicateProduct(product))
        // {
        //     $scope.errorsFound = true;
        //     $scope.duplicateProductErrorMessage = 'product with same name, supplier and category already exists';
        //     return;
        // }
        if ($rootScope.updateCourse) {
            courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
            alert  (JSON.stringify(response.data));
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
        // $scope.errorsFound = false;
        // $scope.duplicateFound = false;
    }  




});


