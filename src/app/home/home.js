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

            //accordion close
            $scope.open = false;

            //form empty
            $scope.formData ={};

            //Date initialization
            $scope.formData.currentDate = $filter("date")(Date.now(), 'yyyy-MM-dd');

            //Select box initialization
            $scope.formData.typeAmount="Add amount";
        };

        //Add amount
        $scope.add = function(){

            if(($scope.formData.typeAmount!==undefined)&&($scope.formData.monneyAmount!==undefined)&&($scope.formData.monneyAmount!==0)){

                var type =$scope.checkType($scope.formData.typeAmount);
                if(type){
                    var item = {date : new Date(), value: Number($scope.formData.monneyAmount), currency : iWalletService.getCurrency(),type: type };
                    iWalletService.addAmount(item, function(ret){

                        //No problem
                        if(ret===0){
                            //Close accordion
                            $scope.open=false;
                            $scope.formData.monneyAmount=undefined;

                         //Error
                        }else if(ret===1){
                            alert("Wrong object, please reset the application");

                          //Wallet can't be negative
                        }else if(ret===2){
                            alert("The wallet amount can't be negative");
                        }
                    });
                }else{
                    alert("you must choose a value between add/remove");
                    //TO DO handle error of selector
                }
            }else{
                alert("You must define a value different from zero");
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

        //Cancel Amount and close accordion
        $scope.cancel = function(){
            $scope.open=false;
        };



});




