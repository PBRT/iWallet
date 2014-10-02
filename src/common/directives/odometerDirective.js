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
}])
//Change grand total currency
.directive('currency',['iWalletService',function (iWalletService) {
    return {
        restrict: 'A',
        require:'ngModel',
        link: function(scope, element,attrs,model) {

            //initialization
            model.$setViewValue('eur');

            scope.$watch(attrs.ngModel, function (v) {

                iWalletService.setCurrentCurrency(v);
                //Call service function to convert grand total values
                iWalletService.convertCurrency(v, function(val){
                    if(val){
                        iWalletService.setGrandTotal(val);
                    }
                });
            });

        }
    };
}])

//Update logo -- TO BIND WITH CURRENCY LIST
.directive('logo',['iWalletService',function (iWalletService) {
    return {
        restrict: 'A',
        link: function(scope, element,attrs,model) {

            //Check when grandTotal change and update the dom
            scope.$watch(function(){return iWalletService.getCurrentCurrency();}, function(newVal){
                var cl = "fa fa-"+newVal+" fa-5x";
                element.removeAttr('class');
                element.addClass(cl);
            });
        }
    };
}]);
