schoolApp.constant('configSettings', {
    'schoolApi': 'http://localhost:8082',
    'adminImagePath': 'image_for_admin_id_',
    'courseImagePath': 'image_for_course_id_',
    'studentImagePath': 'image_for_student_id_'
 }); 


schoolApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'mainTemp.html',
    })
    .when('/school', {
        templateUrl: 'school/schoolTenplate.html'
        //templateUrl: 'school/school.html'
    })
    .when('/administration', {
        templateUrl: 'administration/administrationMain.html'
    })
    .when('/logout', {
        controller: 'login/logout.controller.js'
    })
});

