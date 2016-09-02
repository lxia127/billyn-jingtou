angular.module('starter')

.factory('AuthInterceptor', function ($rootScope, $q, Util, AUTH_EVENTS, $localStorage) {

  return {
      // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      //  var LOCAL_TOKEN_KEY = 'yourTokenKey';
      // var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      var token = $localStorage.Token;
      if (token && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },


    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
