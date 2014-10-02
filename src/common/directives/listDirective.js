angular.module('list',['iWalletService'])


//Template of a list, updated from iWalletService
.directive('list',['iWalletService', function (iWalletService) {
    return {

        template:function(elem,attrs) {
            return '<ul class="list-group">' +
                '<li class="list-group-item list-group-item-'+attrs.listHeaderColor+'">Amount '+attrs.listType+'</li>' +
                '<li class="list-group-item" ng-repeat="amount in list">' +
                '<p>' + "{{amount.value}}" +
                '<i class="fa fa-{{amount.currency}}"></i>' +
                '<p class="dateText">' + '{{amount.date |' + attrs.listFilter + ' }}' + '</p>' +
                '</p>' +
                '</li>' +
                '</ul>';
        },
        scope : {
            listType : '=listType'
        },
        controller: function($scope,$element, $attrs){

            //Get list type
            if($attrs.listType=="added"){

                //Get the list
                $scope.list=iWalletService.getAddList();

                //Watch update
                $scope.$watchCollection(function(){return iWalletService.getAddList();}, function(newVal,oldVal){
                    $scope.list=newVal;
                });
            }else if($attrs.listType=="removed"){

                //Get the list
                $scope.list=iWalletService.getRemoveList();

                //Watch update
                $scope.$watchCollection(function(){return iWalletService.getRemoveList();}, function(newVal,oldVal){
                    $scope.list=newVal;
                });
            }

        }

    };
}]);
