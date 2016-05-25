
angular.module('BusTracker')

.controller("home", function($scope, Homeservice){ //dependency injection
	
	$scope.wait= function waiting()
	{
		waits=getElementById("waiting").value;
		localStorage.setItem("waiting", "waits");
	}

	$scope.ride= function riding(){
		riding=getElementById("riding").value;	
		localStorage.setItem("riding", "riding");																										
	}
	 $scope.message = Homeservice;
	})

 .controller('routeCtrl', function($scope, BusService) {
  $scope.routes = BusService;
})

 .controller('MapCtrl', function($scope, $state, $firebaseArray) {

  var options = {timeout: 10000, enableHighAccuracy: true};
 
  navigator.geolocation.getCurrentPosition(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 	

 	var fb = new Firebase("https://luminous-heat-4419.firebaseio.com/MappDetails");
	var fb_array = $firebaseArray(fb);

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 	
 	google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 



  fb.push().set({
  	"lat":position.coords.latitude,
  	"long":position.coords.longitude,
  	"time":" ",
  	"route":" "
  });    

  fb_array.$loaded(function(points){
    angular.forEach(fb_array, function(value, key){
     //CREATES THE MARKER
     console.log(fb_array[key]);
     var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });
  })
  })
  
  

	console.log(fb_array);
 
});
  }, function(error){
    console.log("Could not get location");
  },
  options
  );
});
 