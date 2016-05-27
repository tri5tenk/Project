
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

 .controller('MapCtrl', function($scope, $state, $firebaseArray, ButtonService, RouteService, $ionicPopup, $cordovaGeolocation, $location) {

  var options = {timeout: 10000, enableHighAccuracy: false};
  var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
  };

  $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
    console.log(position);
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
        var time = new Date();
        var timestr = time.getFullYear() + "/" + time.getMonth() + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
          fb.push().set({
          "lat":position.coords.latitude,
          "long":position.coords.longitude,
          "time":timestr,
          "route":route
        });
      }


      fb_array.$loaded(function(points){
        angular.forEach(points, function(value, key){

        //var timeString = formatDate("hh:mm");
        var time = new Date(value.time);
        var timestr = "";
        if (Object.prototype.toString.call(time) === "[object Date]") {
          timestr = ' bus was here at ' + time.getHours() + ":" + time.getMinutes();
        } else {
          timestr = "bus arrival unknown";
        }
        console.log(time.toString());
        var contentString ='<div id="content">The '+value.route + timestr + '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });  
    

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: {lat: value.lat, lng: value.long}
        });

        marker.addListener('click', function() {
          infowindow.open($scope.map, marker);
        });
      })
    })

        switch(route)
        {
          case 'Airport':
                 var site = new google.maps.LatLng(13.081328909686434, -59.49128795502929);
                 var hospital = new google.maps.LatLng(13.09938657450807,-59.61299587128906);
          break;

          case 'Bathsheba':
                var site = new google.maps.LatLng(13.210545729689418, -59.52810932038574);
                var hospital = new google.maps.LatLng(13.096021762766059, -59.61224485276489);
          break;


          case 'Boscobelle':
                var site = new google.maps.LatLng(13.285361627475657, -59.57844901917724);
                 var hospital = new google.maps.LatLng(13.09809081393915,-59.62226558564453);
          break;


          case 'Fairchild':
                var site = new google.maps.LatLng(13.096021762766059, -59.61224485276489);
                var hospital = new google.maps.LatLng(13.09809081393915, -59.62226558564453);
          break;

          case 'Bridgetown':
                var site = new google.maps.LatLng(13.09809081393915, -59.62226558564453);
                var hospital = new google.maps.LatLng(13.14139059871579, -59.6064298236206);
          break;

          case 'Fairvalley':
                var site = new google.maps.LatLng(13.077106903724507, -59.51484847901611);
                var hospital = new google.maps.LatLng(13.06481669291451,-59.549438246472164);
          break;

          case 'Jackson':
                var site = new google.maps.LatLng(13.145653292276851, -59.599820860607906);
                var hospital = new google.maps.LatLng(13.09809081393915, -59.62226558564453);
          break;
        }
         

    var directionsService = new google.maps.DirectionsService();
         var directionsDisplay = new google.maps.DirectionsRenderer({map:$scope.map});

         var request = {
             origin : site,
             destination : hospital,
             travelMode : google.maps.TravelMode.DRIVING
         };
         directionsService.route(request, function(response, status) {
             if (status == google.maps.DirectionsStatus.OK) {
                 directionsDisplay.setDirections(response);
             }
         });

         directionsDisplay.setMap($scope.map);
   
  });
  }, function(error){
    console.log("Could not get location");
    $ionicPopup.alert({
      title: 'Failed to get Location',
      template: error
    });
  },
  options
  );

 $scope.gotourl = function(path){
    $location.path(path);
  }
});
 