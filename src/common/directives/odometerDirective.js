angular.module('odometer', ['iWalletService'])

//Display amount of GrandTotal and update it
.directive('odometerDisplay',['iWalletService',function (iWalletService) {
    return {
        restrict: 'A',
        link: function(scope, element) {

            //Creates new instance
            new Odometer({el: element[0], value: 0});

            //Get the grandTotal value
            element.text(iWalletService.getGrandTotal());

            //Check when grandTotal change and update the dom
            scope.$watch(function(){return iWalletService.getGrandTotal();}, function(newVal,oldVal){
                element.text(newVal);
            });

        }
    };
}]);
