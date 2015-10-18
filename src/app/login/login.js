angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'Authentication'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'LoginCtrl', function LoginController( $scope, $http, $location, AuthenticationService ) {
        // reset login status
        AuthenticationService.ClearCredentials();
  
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                  console.log('success');
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/home');
                } else {
                    $scope.error = response;
                    $scope.dataLoading = false;
                }
            });
        };
        
        //get status
      $http.get($scope.baseUrl + ":" + $scope.port + "/status")
          .success(function(response) {
            response.players = response.players.split('/');
            $scope.systemStatus = response;
      });

});
