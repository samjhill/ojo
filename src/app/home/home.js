
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

.controller( 'HomeCtrl', function HomeController( $scope, $http, $timeout ) {
    
    $scope.getStatus = function(){
      $http.get("http://samhillmade.it:4730/systemLoad")
        .success(function(response) {
          $scope.systemLoad = response;
      });
          
      $http.get("http://samhillmade.it:4730/status")
          .success(function(response) {
            response.players = response.players.split('/');
            $scope.systemStatus = response;
      });
    };
 
    $scope.startServer = function(){
      alertService.add('info', 'Starting up...');
      
      $http.post("http://samhillmade.it:4730/start")
          .success(function(response) {
            alertService.add('success', 'The ARK is coming online.');
      });
    };
    
    $scope.stopServer = function(){
      alertService.add('info', 'Shutting down...');
      
      $http.post("http://samhillmade.it:4730/stop")
          .success(function(response) {
            alertService.add('success', 'The ARK is now offline.');
      });
    };
    
    $scope.spawnAlert = function(){
      alertService.add('info', 'Test alert');
    }
    
    $timeout($scope.getStatus, 5000); //update every 5 seconds
    
    $scope.getStatus(); //one for the initial load
      
    //$http.get("http://samhillmade.it:4730/checkUpdate")
    //    .success(function(response) {
    //      $scope.update = response;
    //});  
    
  
});
