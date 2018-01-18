schoolApp.constant('configSettings', {
    'schoolApi': 'http://localhost:8082',
    'adminImagePath': 'settingValue'
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
