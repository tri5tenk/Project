
angular.module('BusTracker')
.controller("home", function($scope, Homeservice){ //dependency injection
 $scope.message = Homeservice;
})

.controller('routeCtrl', function($scope, BusService) {
  $scope.routes = BusService;
});