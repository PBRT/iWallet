describe('walletService tests', function (){

    describe('definitions and initializations tests', function() {
        var iWalletService;

        // excuted before each "it" is run.
        beforeEach(function ($injector) {

            // load the module.
            module('iWalletService');

            // inject your service for testing.
            // The _underscores_ are a convenience thing
            // so you can have your variable name be the
            // same as your injected service.
            inject(function (_iWalletService_) {
                iWalletService = _iWalletService_;

            });

        });

        //Check functions definitions
        it('should have an getAddList function', function () {
            expect(angular.isFunction(iWalletService.getAddList)).toBe(true);
        });
        it('should have an getRemoveList function', function () {
            expect(angular.isFunction(iWalletService.getRemoveList)).toBe(true);
        });
        it('should have an getGrandTotal function', function () {
            expect(angular.isFunction(iWalletService.getGrandTotal)).toBe(true);
        });
        it('should have an resetAddList function', function () {
            expect(angular.isFunction(iWalletService.resetAddList)).toBe(true);
        });
        it('should have an resetRemoveList function', function () {
            expect(angular.isFunction(iWalletService.resetRemoveList)).toBe(true);
        });
        it('should have an resetGrandTotal function', function () {
            expect(angular.isFunction(iWalletService.resetGrandTotal)).toBe(true);
        });
        it('should have an resetfunction', function () {
            expect(angular.isFunction(iWalletService.resetApplication)).toBe(true);
        });
        it('should have an setAddList function', function () {
            expect(angular.isFunction(iWalletService.setAddList)).toBe(true);
        });
        it('should have an setRemoveList function', function () {
            expect(angular.isFunction(iWalletService.setRemoveList)).toBe(true);
        });
        it('should have an setGrandTotal function', function () {
            expect(angular.isFunction(iWalletService.setGrandTotal)).toBe(true);
        });
        it('should have an addAmout function', function () {
            expect(angular.isFunction(iWalletService.addAmount)).toBe(true);
        });
        it('should have an checkObject function', function () {
            expect(angular.isFunction(iWalletService.checkObjet)).toBe(true);
        });

        //Check initialization
        it('should have an grandTotal equal to 0.0', function () {
            expect(iWalletService.getGrandTotal()).toEqual(0.0);
        });
        it('should have an addList equal empty', function () {
            expect(iWalletService.getAddList()).toEqual([]);
        });
        it('should have an removeList empty', function () {
            expect(iWalletService.getRemoveList()).toEqual([]);
        });
        it('should have an amount structure specific', function () {
            expect(iWalletService.getAmountStructure()).toEqual(['date', 'value', 'currency', 'type']);
        });

        //Check set functions
        it('should set GrandTotal to 10', function () {
            iWalletService.setGrandTotal(10);
            expect(iWalletService.getGrandTotal()).toEqual(10);
        });
        it('should add an item to AddList', function () {
            var item = [{date: "06/11/1991", value:"10", type: "add", currency:'eur'}];
            iWalletService.setAddList(item);
            expect(iWalletService.getAddList()).toEqual(item);
        });
        it('should add an item to RemoveList', function () {
            var item = [{date: "06/11/1991", value:"10", type: "remove", currency:'eur'}];
            iWalletService.setRemoveList(item);
            expect(iWalletService.getRemoveList()).toEqual(item);
        });

        //Check reset functions
        it('should reset GrandTotal to 0', function () {
            iWalletService.resetGrandTotal();
            expect(iWalletService.getGrandTotal()).toEqual(0.0);
        });
        it('should reset AddList', function () {
            iWalletService.resetAddList();
            expect(iWalletService.getAddList()).toEqual([]);
        });
        it('should reset RemoveList', function () {
            iWalletService.resetRemoveList();
            expect(iWalletService.getRemoveList()).toEqual([]);
        });



    });

    describe('objects functions tests', function() {

        var iWalletService;
        var item = {date: "06/11/1991", value:"10", type: "remove", currency:'eur'};
        var item1 = {value:"10", type: "remove", currency:'eur'};
        var item2 = {date: "06/11/1991", nom:"10", type: "remove", currency:'eur'};
        var item3 = {date1:"06/88/48",date: "06/11/1991", value:"10", type: "remove", currency:'eur'};

        // excuted before each "it" is run.
        beforeEach(function ($injector) {

            // load the module.
            module('iWalletService');

            // inject your service for testing.
            // The _underscores_ are a convenience thing
            // so you can have your variable name be the
            // same as your injected service.
            inject(function (_iWalletService_) {
                iWalletService = _iWalletService_;
            });
         });

        //Check checkObject function
        it('should return undefined undefined object', function () {
            var result;
            iWalletService.checkObjet(undefined,function(val){result=val;});
            expect(result).toEqual(false);
        });
        it('should return false because of size', function () {
            var result;
            iWalletService.checkObjet(item1,function(val){result=val;});
            expect(result).toEqual(false);
        });
        it('should return false because of size', function () {
            var result;
            iWalletService.checkObjet(item3,function(val){result=val;});
            expect(result).toEqual(false);
        });
        it('should return false because of keys values', function () {
            var result;
            iWalletService.checkObjet(item2,function(val){result=val;});
            console.log(result);
            expect(result).toEqual(false);
        });
        it('should return true', function () {
            var result;
            iWalletService.checkObjet(item,function(val){result=val;});
            console.log(result);
            expect(result).toEqual(true);
        });
    });

    describe('add amount functions tests', function() {

        var iWalletService,localStorageService;
        var item = {date: "06/11/1991", value:"10", type: "remove", currency:'eur'};
        var item1 = {value:"10", type: "remove", currency:'eur'};
        var item2 = {date: "06/11/1991", value:"25", type: "add", currency:'eur'};


        // excuted before each "it" is run.
        beforeEach(function ($injector) {

            // load the module.
            module('iWalletService');
            module('LocalStorageModule');

            // inject your service for testing.
            // The _underscores_ are a convenience thing
            // so you can have your variable name be the
            // same as your injected service.
            inject(function (_iWalletService_, _localStorageService_) {
                iWalletService = _iWalletService_;
                localStorageService=_localStorageService_;
            });
            localStorageService.clearAll();
        });

        //Check checkObject function
        it('should return zero bad object', function () {
            var result;
            iWalletService.addAmount(item1,function(val){result=val;});
            expect(result).toEqual(1);
            expect(iWalletService.getAddList()).toEqual([]);
            expect(iWalletService.getRemoveList()).toEqual([]);
            expect(iWalletService.getGrandTotal()).toEqual(0.0);
        });
        it('should return 2 because the GrandTotal go to be negative', function () {
            var result;
            iWalletService.addAmount(item,function(val){result=val;});
            expect(result).toEqual(2);
            expect(iWalletService.getAddList()).toEqual([]);
            expect(iWalletService.getRemoveList()).toEqual([]);
            expect(iWalletService.getGrandTotal()).toEqual(0.0);
        });
        it('should return 0 because all is fine', function () {
            var result;
            iWalletService.addAmount(item2,function(val){result=val;});
            expect(result).toEqual(0);
            expect(iWalletService.getAddList()).toEqual([item2]);
            expect(iWalletService.getRemoveList()).toEqual([]);
            expect(iWalletService.getGrandTotal()).toEqual(25);

            // Delete a key
            localStorageService.clearAll();

        });
        it('should return 0 because all is fine', function () {
            var result;
            iWalletService.addAmount(item2,function(val){result=val;});
            expect(iWalletService.getAddList()).toEqual([item2]);
            expect(iWalletService.getRemoveList()).toEqual([]);
            expect(iWalletService.getGrandTotal()).toEqual(25);
            iWalletService.addAmount(item,function(val){result=val;});
            expect(iWalletService.getAddList()).toEqual([item2]);
            expect(iWalletService.getRemoveList()).toEqual([item]);
            expect(iWalletService.getGrandTotal()).toEqual(15);
            expect(result).toEqual(0);

            // Delete a key
            localStorageService.clearAll();

        });
        it('should return false', function () {
            iWalletService.setGrandTotal(0.0);
            expect(iWalletService.authorizeTransaction(20)).toEqual(false);
        });
        it('should return true', function () {
            iWalletService.setGrandTotal(10.0);
            expect(iWalletService.authorizeTransaction(5)).toEqual(true);
        });


    });

});