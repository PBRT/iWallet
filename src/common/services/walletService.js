angular.module('iWalletService', [])

.factory('iWalletService', function(){

        //grand Total
        var grandTotal = 0.0;

        //Added amount list
        var addList = [];

        //Removed amount list
        var removeList = [];

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

            //add an amount
            addAmount : function(amount, cb){

                var self=this;
                self.checkObjet(amount, function(val){
                    if(val){
                        if(amount.type=='add') {
                            grandTotal += Number(amount.value);
                            addList.push(amount);
                            cb(0);
                        }
                        else if(amount.type=='remove') {
                            if(self.authorizeTransaction(amount.value)){
                                grandTotal -= amount.value;
                                removeList.push(amount);
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