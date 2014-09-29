angular.module( 'iWallet.home', [
  'ui.router'
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

/* Controller HOME */
.controller( 'HomeCtrl', function HomeController( $scope, $filter) {

        $scope.init = function(){

            //Date initialization
            $scope.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');
        };

        //Add amount
        $scope.add = function(){
            console.log($scope.typeAmount);
            console.log($scope.monneyAmount);
        };

        //Cancel Amount
        $scope.cancel = function(){

        };



});


