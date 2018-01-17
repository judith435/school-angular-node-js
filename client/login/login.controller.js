schoolApp.controller('loginController', function handleSchoolLoad($scope) {

    //angular.element(document.querySelector("#txtInput")).addClass("customclass");
    //simulate that admin logged in
    angular.element(document.querySelector("#school-link")).removeClass("hide");
    angular.element(document.querySelector("#administration-link")).removeClass("hide");
    angular.element(document.querySelector("#logout-link")).removeClass("hide");
    angular.element(document.querySelector("#admr-image")).removeClass("hide");

});
