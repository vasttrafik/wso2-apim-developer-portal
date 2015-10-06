app = angular.module('vtPortal', [])
.directive('header', function(){
      return {
        templateUrl: 'partials/header.html'
      }
    });

app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

});
