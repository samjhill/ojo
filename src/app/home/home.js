
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

.controller( 'HomeCtrl', function HomeController( $scope, $http ) {
  
    $http.get("http://samhillmade.it:4730/systemLoad")
        .success(function(response) {
          $scope.systemLoad = response;
    });
        
    $http.get("http://samhillmade.it:4730/status")
        .success(function(response) {
          response.players = response.players.split('/');
          $scope.systemStatus = response;
    });
      
    //$http.get("http://samhillmade.it:4730/checkUpdate")
    //    .success(function(response) {
    //      $scope.update = response;
    //});  
    
  
});
