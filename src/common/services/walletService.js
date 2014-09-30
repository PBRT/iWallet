angular.module('iWalletService', ['LocalStorageModule'])

.factory('iWalletService', function(localStorageService){

        //currency
        var currency ="euro";

        //grand Total
        var grandTotal = 0.0;
        if (localStorageService.get('grandTotal')) {
            grandTotal = localStorageService.get('grandTotal');
        }

        //Added amount list
        var addList = [];
        if (localStorageService.get('add')) {
            addList = localStorageService.get('add');
        }

        //Removed amount list
        var removeList = [];
        if (localStorageService.get('remove')) {
            removeList = localStorageService.get('remove');
        }

        //Amount object structure
        var amountStructure = [ 'date', 'value', 'currency','type'];


        return {

            //Getters
            getAddList : function(){
                return addList;
            },

            getRemoveList : function(){
                return removeList;
            },

            getAmountStructure : function(){
                return amountStructure;
            },

            getGrandTotal : function(){
                return grandTotal;
            },

            getCurrency : function(){
                return currency;
            },

            //Set
            setAddList : function(val){
                addList = val;
            },

            setRemoveList : function(val){
                removeList = val;
            },

            setGrandTotal : function(val){
                grandTotal = val;
            },

            //Reset
            resetAddList : function(){
                addList = [];
            },

            resetRemoveList : function(){
                removeList = [];
            },

            resetGrandTotal : function(){
              grandTotal = 0.0;
            },

            resetApplication : function(){
                // Start fresh
                localStorageService.clearAll();

                this.resetAddList();
                this.resetRemoveList();
                this.resetGrandTotal();

            },

            //add an amount
            addAmount : function(amount, cb){

                var self=this;
                self.checkObjet(amount, function(val){
                    if(val){
                        if(amount.type=='add') {
                            grandTotal += Number(amount.value);
                            localStorageService.set('grandTotal', grandTotal);
                            addList.push(amount);
                            localStorageService.set('add',addList);
                            cb(0);
                        }
                        else if(amount.type=='remove') {
                            if(self.authorizeTransaction(amount.value)){
                                grandTotal -= amount.value;
                                localStorageService.set('grandTotal', grandTotal);
                                removeList.push(amount);
                                localStorageService.set('remove',removeList);
                                cb(0);
                            }else{
                                cb(2);
                            }
                        }
                        else {
                            cb(1);
                        }
                    }else{
                        cb(1);
                    }
                });
            },

            //Check objet function
            checkObjet : function(obj, cb){

                if(obj) {
                    //Size check
                    if (Object.keys(obj).length == amountStructure.length) {

                        var i = 0;
                        var result = true;

                        for (i = 0; i < amountStructure.length; i++) {
                            if (!obj.hasOwnProperty(amountStructure[i])) {
                                result = false;
                            }
                            if (i == amountStructure.length-1) {
                                cb(result);
                            }
                        }

                    } else {
                        cb(false);
                    }
                }else {
                    cb(false);
                }
            },

            //Check grandTotal values before transaction
            //Enable to manage deficit in future
            authorizeTransaction : function(val){

                var result;
                result=grandTotal-val;
                return Boolean(result>=0);
            }

        };

});