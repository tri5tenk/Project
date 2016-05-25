
angular.module('BusTracker')

.controller("home", function($scope, Homeservice, $location){ //dependency injection
 $scope.message = Homeservice;
 $scope.gotourl = function(path, whichclicked){
    $location.path(path);

    if(whichclicked=='waiting')
    {
      alert('hello')
    }
 }
})

 .controller('routeCtrl', function($scope, BusService) {
  $scope.routes = BusService;
})

 .controller('MapCtrl', function($scope, $state) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  navigator.geolocation.getCurrentPosition(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 	
 	google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
 //CREATES THE MARKER
  var marker = new google.maps.Marker({
      map: $scope.map,
      animation: google.maps.Animation.DROP,
      position: latLng
  });      
 
});
  }, function(error){
    console.log("Could not get location");
  },
  options
  );
});
 