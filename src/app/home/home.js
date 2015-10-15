
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
      $parent.$scope.message.type = 'info';
      $parent.$scope.message.data = 'Server is starting up...';
      
      $http.post("http://samhillmade.it:4730/start")
          .success(function(response) {
            $parent.$scope.message.type = 'success';
            $parent.$scope.message.data = response;
      });
    };
    
    $scope.stopServer = function(){
      $parent.$scope.message.type = 'info';
      $parent.$scope.message.data = 'Server is shutting down...';
      
      $http.post("http://samhillmade.it:4730/stop")
          .success(function(response) {
            $parent.$scope.message.type = 'success';
            $parent.$scope.message.data = response;
      });
    };
    
    $timeout($scope.getStatus, 5000); //update every 5 seconds
    
    $scope.getStatus(); //one for the initial load
      
    //$http.get("http://samhillmade.it:4730/checkUpdate")
    //    .success(function(response) {
    //      $scope.update = response;
    //});  
    
  
});
