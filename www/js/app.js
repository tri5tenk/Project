// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('BusTracker', ['ionic', "firebase", 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
 $stateProvider

 .state('home', {
   url: '/home',
   templateUrl: 'templates/home.html',
   controller: 'home'
 })

 .state('routes', {
   url: '/routes',
   templateUrl: 'templates/routes.html',
   controller: 'routeCtrl'
 })

 .state('map', {
    url: '/map',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  })

 .state('aboutus', {
    url: '/aboutus',
    templateUrl: 'templates/aboutus.html',
    controller: 'home'
  })

 .state('help', {
    url: '/help',
    templateUrl: 'templates/help.html',
    controller: 'home'
  })



 $urlRouterProvider.otherwise('/home');
});


