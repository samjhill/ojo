
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'angular-svg-round-progress'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeController( $scope, $http, $interval, alertService ) {
    
    $scope.getStatus = function(){
      $http.get($scope.baseUrl + ":" + $scope.port + "/systemLoad", {ignoreLoadingBar: true})
        .success(function(response) {
          $scope.systemLoad = response;
      });
          
      $http.get($scope.baseUrl + ":" + $scope.port + "/status", {ignoreLoadingBar: true})
          .success(function(response) {
            response.players = response.players.split('/');
            $scope.systemStatus = response;
      });
    };
 
    $scope.startServer = function(){
      alertService.add('info', 'Starting up...');
      
      $http.post($scope.baseUrl + ":" + $scope.port + "/start")
          .success(function(response) {
            alertService.add('success', 'The ARK is coming online.');
      });
    };
    
    $scope.stopServer = function(){
      alertService.add('info', 'Shutting down...');
      
      $http.post($scope.baseUrl + ":" + $scope.port + "/stop")
          .success(function(response) {
            alertService.add('success', 'The ARK is now offline.');
      });
    };
    
    $scope.checkUpdate = function(){
      $http.get($scope.baseUrl + ":" + $scope.port + "/isUpdated")
          .success(function(response) {
            $scope.isUpdated = response;
            if (response == "false") {
              alertService.add('info', 'A new update is available.');
              return false;
            }
            else {
              return true;
            }
      });
    };
    
    $scope.updateServer = function(){
      $http.get($scope.baseUrl + ":" + $scope.port + "/update")
          .success(function(response) {
            alertService.add('success', 'Server is going down for an update.');
            $scope.outputText = angular.fromJson(response);
      });
    }
    /*
     * Runs a RCON command remotely
     * for list of commands, http://ark.gamepedia.com/Console_Commands
     * beware, some work and some do not, and some return no data
     */
    $scope.runCommand = function( command ){
          $http({
              method: 'POST',
              url: $scope.baseUrl + ":" + $scope.port + '/command',
              data: 'command=' + encodeURIComponent(command),
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
          .success(function(response) {
            alertService.add('success', response);
          });
    };
    
    $scope.spawnAlert = function(){
      alertService.add('info', 'Test alert');
    };
    
    /*
     * Initialization
     */
    var statusChecker = $interval($scope.getStatus, 5000); //update every 5 seconds
    var updateChecker = $interval($scope.checkUpdate, (1000 * 60 * 15)); //update every 15 mins
    // listen on DOM destroy (removal) event, and cancel the next UI update
      // to prevent updating time after the DOM element was removed.
     $scope.$on(
              "$destroy",
                        function( event ) {
                            $timeout.cancel( statusChecker );
                            $timeout.cancel( updateChecker );
                        }
  );
          
    //once for startup
    $scope.getStatus(); 
    $scope.checkUpdate();
      
    
    
  
});
