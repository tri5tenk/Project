angular.module("BusTracker")
.factory('BusService', function() {

 routes = [
    { title: 'Airport to University Drive [56]',  name: 'Airport' },
    { title: 'Bathsheba towards Fairchild Terminal [6]', name: 'Bathsheba' },
    { title: 'Boscobelle towards Princess Alice Terminal [1A]', name: 'Boscobelle'},
    { title: 'Fairchild St Terminal to Princess Alice Terminal [51]', name: 'Fairchild' },
    { title: 'Bridgetown towards  Warrens [57]', name: 'Bridgetown' },
    { title: 'Fairvalley to Oistins [12A]', name: 'Fairvalley'},
    { title: 'Jackson towards  Princess Alice Terminal [22]', name: 'Jackson' }
  ];

 return routes;

	

});