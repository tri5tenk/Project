angular.module("BusTracker")
.factory('PointService', function($firebaseArray) {
 
var fb = new Firebase("https://luminous-heat-4419.firebaseio.com/MappDetails");
	var fb_array = $firebaseArray(fb);
 
});