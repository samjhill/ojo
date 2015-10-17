
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

.controller( 'HomeCtrl', function HomeController( $scope, $http, $timeout, alertService ) {
    
    $scope.getStatus = function(){
      $http.get($scope.baseUrl + ":" + $scope.port + "/systemLoad")
        .success(function(response) {
          $scope.systemLoad = response;
      });
          
      $http.get($scope.baseUrl + ":" + $scope.port + "/status")
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
      $http.get($scope.baseUrl + ":" + $scope.port + "/checkupdate")
          .success(function(response) {
            console.log(response);
            $scope.updateStatus = response;
      });
    };
    
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
    $timeout($scope.getStatus, 5000); //update every 5 seconds
    $timeout($scope.checkUpdate, (1000 * 60 * 15)); //update every 15 mins
    
    //once for startup
    $scope.getStatus(); 
    $scope.checkUpdate();
      
    //$http.get($scope.baseUrl + ":" + $scope.port + "/checkUpdate")
    //    .success(function(response) {
    //      $scope.update = response;
    //});  
    
  
});
