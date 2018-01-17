schoolApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'login/home.html',
    })
    .when('/school', {
        templateUrl: 'school/schoolMain.html'
    })
    .when('/administration', {
        templateUrl: 'administration/administrationMain.html'
    })
    .when('/logout', {
        controller: 'login/logout.controller.js'
    })
});