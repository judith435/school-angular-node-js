schoolApp.directive('onFinishSchoolRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngSchoolRepeatFinished');
				});
			}
		}
	}
});



// link: function(scope, element){
// 	$templateRequest("template.html").then(function(html){
// 	   var template = angular.element(html);
// 	   element.append(template);
// 	   $compile(template)(scope);
// 	});
//  };
