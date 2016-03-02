angular.module('scheduler.services', [])

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (res) {
      return res.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.scheduler');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.scheduler');
    $location.path('/landing');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('Events', function ($http) {
  var events = {};
  events.eventFriends = [];
  events.myID = 4;
  events.myEvents = [];
  events.allEvents = [];
  events.getEvents = function (id) {
    var route = '/events/' + id;
    return $http({
      method: 'GET',
      url: route
    })
    .then(function (resp) {
      if(id === events.myID) {
        events.myEvents = resp.body;
      } else {
        events.allEvents.concat(resp.body);
      }
    });
  };
  return events;

})
.factory('Friends', function ($http) {
  var friends = {};
  friends.allMyFriends = [];
  friends.getFriends = function (userID) {
    var route = '/friends/';
    return $http({
      method: 'GET',
      url: route,
      params: {userId: userID}
    })
    .then(function (resp) {
        friends.allMyFriends = resp.body;
      });
  };
  return friends;
});
