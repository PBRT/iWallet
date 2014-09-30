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
.controller( 'HomeCtrl', function HomeController( $scope, $filter, iWalletService) {

        $scope.init = function(){

            $scope.formData ={};

            //Date initialization
            $scope.formData.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');

            //Select box initialization
            $scope.formData.typeAmount="Add amount";

            $scope.addList=iWalletService.getAddList();
            $scope.removeList=iWalletService.getRemoveList();

        };

        //Add amount
        $scope.add = function(){

            if(($scope.formData.typeAmount!==undefined)&&($scope.formData.monneyAmount!==undefined)){
                var type =$scope.checkType($scope.formData.typeAmount);
                if(type){
                    var item = {date : new Date(), value: Number($scope.formData.monneyAmount), currency : iWalletService.getCurrency(),type: type };
                    iWalletService.addAmount(item, function(ret){

                        //No problem
                        if(ret===0){
                            console.log("ook");

                         //Error
                        }else if(ret===1){
                            console.log("error");

                          //Wallet can't be negative
                        }else if(ret===2){
                            console.log("not negative");
                        }
                    });
                }else{
                    console.log("error selector");
                    //TO DO handle error of selector
                }
            }else{
                console.log("undefined");
                //TO DO handle error of undefined with ditry checking
            }


        };

        $scope.checkType = function(val){

            var result;

            if(val=="Add amount"){
                result="add";
            }else if(val =="Remove amount"){
                result="remove";
            }else{
                result=undefined;
            }

            return result;
        };

        //Cancel Amount
        $scope.cancel = function(){

        };



}).directive('odometer',['iWalletService',function (iWalletService) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

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




