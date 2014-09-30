angular.module( 'iWallet', [
  'templates-app',
  'templates-common',
  'iWallet.home',
  'ui.router',
  'snap',
  'ui.bootstrap',
  'iWalletService',
  'odometer',
  'list',
  'commonFilters'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider,snapRemoteProvider ) {
  $urlRouterProvider.otherwise( '/home' );

        snapRemoteProvider.globalOptions = {
            disable: 'left',
            touchToDrag: false
        };

})

.run( function run ($rootScope) {

        //Global Menu definition
        $rootScope.globalMenu = [{name : 'Home', work : 'home'},
                                 {name : 'Reset', work : 'reset'},
                                 {name : 'View Source', work : 'source'}];


})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $rootScope, $modal) {

        //Redirection function
        $scope.redirect= function(path){

            /* Reset*/
            if(path=="reset"){
                $scope.open();
            }
            /*Home*/
            else if(path=="home"){
                $location.path('/home');
            }
            /*Source*/
            else if(path=="source"){
                console.log('source');
            }
            else{
                alert('Wrong path, please reload the app');
            }
        };


        // Confirmation modal Reset
        $scope.open = function (size) {

            var modalInstance = $modal.open({
                templateUrl: 'resetmodal.tpl.html',
                controller: 'AppCtrl.modal',
                size: size
            });
            modalInstance.result.then();
        };


})

/* Controller for the MODAL */
.controller('AppCtrl.modal', function AppControllerModal ($scope, $modalInstance, iWalletService ){

    $scope.ok = function () {
        $modalInstance.close();
        iWalletService.resetApplication();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

