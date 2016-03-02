angular.module('scheduler', [
  'scheduler.services',
  'scheduler.auth',
  'scheduler.home',
  'scheduler.calendar',
  'scheduler.create',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/calendar/calendarView.html',
      controller: 'CalendarController',
      authenticate: true
    })
    .when('/landing', {
      templateUrl: 'app/landing/landing.html'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/create', {
      templateUrl: 'app/createEvents/createEventView.html',
      controller: 'CreateEventController'
    });

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.scheduler');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/landing');
    }
  });
});
