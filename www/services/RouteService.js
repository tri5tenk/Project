angular.module("BusTracker")
.factory('RouteService', function() {

  var addRoute = function(choose) {
      Route=choose;
  };

  var getRoute = function(){

      return Route;
  };
  return {
  	addRoute:addRoute,
  	getRoute:getRoute
  }
  ;
});