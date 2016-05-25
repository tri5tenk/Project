angular.module("BusTracker")
.factory('MapService', function()
	{
	return localStorage.getItem("option");
	});

