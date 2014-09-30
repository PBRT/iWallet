angular.module('commonFilters',[])

//Date displaying
.filter('dateFilter', function($filter){
    var standardDateFilterFn = $filter('date');
    return function(dateToFormat){
        return  standardDateFilterFn(dateToFormat, 'yy/MM/dd AT h:mma');
    };
});
