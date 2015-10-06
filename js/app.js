app = angular.module('vtPortal', [])
    .directive('header', function(){
      return {
        templateUrl: 'partials/header.html'
      }
    })
.directive('footer', function () {
    return {
        templateUrl: 'partials/footer.html'
    }
})

app.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

});
