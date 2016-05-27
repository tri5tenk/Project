angular.module("BusTracker")
.factory('ButtonService', function() {

  var addChoice = function(choose) {
      choice=choose;
  };

  var getChoice = function(){
      return choice;
  };
  return {
  	addChoice:addChoice,
  	getChoice:getChoice
  }
  ;
});