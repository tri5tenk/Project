
angular.module('BusTracker')

.controller("home", function($scope, Homeservice, $location, ButtonService){ //dependency injection
 $scope.message = Homeservice;

 $scope.gotourl = function(path, whichclicked){

  if(arguments.length == 2) {
    ButtonService.addChoice(whichclicked);
  }
  
    $location.path(path);
 }
})

 .controller('routeCtrl', function($scope, BusService, RouteService, $location) {
  $scope.routes = BusService;
  //console.log($scope.routes);
    $scope.gotourl = function(path, whichclicked){
    $location.path(path);
    RouteService.addRoute(whichclicked);
 }
})

 .controller('MapCtrl', function($scope, $state, $firebaseArray, ButtonService, RouteService, $location) {

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
 


    choice=ButtonService.getChoice();
    route=RouteService.getRoute();

  if(choice=='riding')
  {
    fb.push().set({
    "lat":position.coords.latitude,
    "long":position.coords.longitude,
    "time":" ",
    "route":route
    });    
  }

  
  fb_array.$loaded(function(points){
    angular.forEach(points, function(value, key){

    var contentString ='<div id="content">hellllllo</div>';

    var infowindow = new google.maps.InfoWindow({
    content: contentString
    });

    var marker = new google.maps.Marker({
    map: $scope.map,
    animation: google.maps.Animation.DROP,
    position: {lat: value.lat, lng: value.long}
    });

     marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  })
  })
  
 
  });
  }, function(error){
    console.log("Could not get location");
  },
  options
  );

  $scope.gotourl = function(path){
    $location.path(path);
  }
});
 