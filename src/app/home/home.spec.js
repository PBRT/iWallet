describe( 'Unit HomeCtrl test section', function() {
    beforeEach(module('iWalletService'));
    beforeEach(module('iWallet.home'));

    beforeEach( inject( function( $controller, _$location_, $rootScope, $filter ) {
        $location = _$location_;
        $scope = $rootScope.$new();
        $filter=$filter;
        HomeCtrl = $controller( 'HomeCtrl', { $location: $location, $scope: $scope });
    }));

    it('should have a dummy test', inject(function () {
        expect(HomeCtrl).toBeTruthy();
    }));



    describe('init() function', function(){

        //Run init function
        beforeEach(function(){
            $scope.init();
        });

        it('should have the open variable defined', function() {
            expect($scope.open).toBeDefined();
        });
        it('should have the formData variable defined', function() {
            expect($scope.formData).toBeDefined();
        });
        it('should have the formData currentDate variable defined', function() {
            expect($scope.formData.currentDate).toBeDefined();
        });
        it('should have the formData currency variable defined', function() {
            expect($scope.formData.currency).toBeDefined();
        });
        it('should have the open variable defined', function() {
            expect($scope.formData.typeAmount).toBeDefined();
        });

    });

    describe('definitions function', function(){


        it('should have the add function defined', function() {
            expect($scope.add).toBeDefined();
        });
        it('should have the cancel function defined', function() {
            expect($scope.cancel).toBeDefined();
        });
        it('should have the cehcktype function defined', function() {
            expect($scope.checkType).toBeDefined();
        });

    });

    describe('add function', function(){

        //Run init function
        beforeEach(function(){
            $scope.init();
        });

        //Data missing
        it('should return 1', function(){
            $scope.formData.typeAmount=undefined;
            $scope.formData.monneyAmount=undefined;
            $scope.formData.monneyAmount=0;
            expect($scope.add()).toEqual(1);
        });
        //Wrong type
        it('should return 1' , function(){
            $scope.formData.typeAmount="";
            $scope.formData.monneyAmount=20;
            expect($scope.add()).toEqual(1);
        });
        //Add
        it('should return 0' , function(){
            $scope.formData.typeAmount="Add amount";
            $scope.formData.monneyAmount=20;
            //expect($scope.add()).toEqual(0);
        });
    });

    describe('check type', function() {

        it ('add' , function () {
            expect($scope.checkType("Add amount")).toEqual("add");
        });
        it ('remove' , function () {
            expect($scope.checkType("Remove amount")).toEqual("remove");
        });
        it ('undefined' , function () {
            expect($scope.checkType("")).toEqual(undefined);
        });
    });

});



