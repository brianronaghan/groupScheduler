angular.module('scheduler.create', [])
.controller('CreateEventController', function ($scope, $location, Events, Friends) {
  $scope.friends = [];
  $scope.getfriendslist = function () {
    $scope.friends = Friends.getFriends(Events.myId);
  };
  $scope.addfriendtoevent = function (friendname) {
    Events.eventFriends.push(friendname);
    // need to convert to get the friend id...
    Events.getEvents(friendname)
      .then(function () {
        console.log("i don't think this has to do anything, b/c it's handled");
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  $scope.createEvent = function () {
    console.log("hello I got pressed");
    /// TODO: once the user decides to (presses a button),
    // send out the event, to all the friends and stuff, and create the event
  };
  function init () {
    $scope.getfriendslist();
  }
  init();
});
// .factory('Events', function ($http) {
//   var events = {};
//   events.myEvents = [];
//   events.allEvents = [];
//
//   events.getEvents = function (id) {
//     var route = '/events/' + id;
//     return $http({
//       method: 'GET',
//       url: route
//     })
//     .then(function (resp) {
//       events.myEvents = resp.body;
//     });
//   };
//   return events;
//
// });
