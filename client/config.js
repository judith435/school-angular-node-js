schoolApp.constant('configSettings', {
    'schoolApi': 'http://localhost:8082',
    'adminImagePath': 'image_for_admin_id_',
    'courseImagePath': 'image_for_course_id_',
    'studentImagePath': 'image_for_student_id_'
    // 'adminImagePath': '../images/admins/image_for_admin_id_',
    // 'courseImagePath': '../images/courses/image_for_course_id_',
    // 'studentImagePath': '../images/students/image_for_student_id_'
 }); 


schoolApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'login/home.html',
    })
    .when('/school', {
        templateUrl: 'school/school.html'
    })
    .when('/administration', {
        templateUrl: 'administration/administrationMain.html'
    })
    .when('/logout', {
        controller: 'login/logout.controller.js'
    })
});





// courseImagePath:  "http://localhost/project-3-john-bryce/images/courses/image_for_course_id_",
// studentImagePath: "http://localhost/project-3-john-bryce/images/students/image_for_student_id_"
