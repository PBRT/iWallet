angular.module('iWalletService', ['LocalStorageModule'])

.factory('iWalletService', function(localStorageService){

        //grand Total
        var grandTotal = 0.0;
        if (localStorageService.get('grandTotal')) {
            grandTotal = Number(localStorageService.get('grandTotal'));
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

        //currency rates exchanges
        //SOON LOADED FROM REST ZEND SERVER
        var currencyRates = [
           {currency : "eur", rates : [ {currency: "usd", rates : 1.26},
                                        {currency: "gbp", rates : 0.78}]},
           {currency : "usd", rates : [ {currency: "eur", rates : 0.78},
                                        {currency: "gbp", rates : 0.61}]},
           {currency : "gbp", rates : [ {currency: "eur", rates : 1.27},
                                        {currency: "usd", rates : 1.61}]}
        ];

        var currentCurrency = "eur";

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

            getcurrencyRates : function(){
                return currencyRates;
            },
            getCurrentCurrency : function(){
              return currentCurrency;
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
            setCurrentCurrency : function(val){
               currentCurrency = val;
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

                            //Add to list
                            addList.push(amount);
                            localStorageService.set('add', addList);

                            //Convert value for grand total
                            if(amount.currency!=self.getCurrentCurrency()){
                                console.log("DIFFERER");
                                console.log(amount.currency);
                                console.log(self.getCurrentCurrency());
                                self.convertValue(amount.value, amount.currency,self.getCurrentCurrency() ,function(val){
                                    var result = 0;
                                    result = self.getGrandTotal() + Number(val);
                                    self.setGrandTotal(result);
                                    localStorageService.set('grandTotal', result);
                                    cb(0);
                                });
                            }else {
                                grandTotal += Number(amount.value);
                                localStorageService.set('grandTotal', grandTotal);
                                cb(0);
                            }
                        }
                        else if(amount.type=='remove') {
                            if(self.authorizeTransaction(amount.value)){

                                //Convert value for grand total
                                if(amount.currency!=self.getCurrentCurrency()) {
                                    self.convertValue(amount.value, amount.currency, self.getCurrentCurrency(), function (val) {
                                        var result = 0;
                                        result = self.getGrandTotal() - Number(val);
                                        if(result<0){
                                            cb(2);
                                        }else {
                                            removeList.push(amount);
                                            localStorageService.set('remove', removeList);
                                            self.setGrandTotal(result);
                                            localStorageService.set('grandTotal', result);
                                            cb(0);
                                        }
                                    });
                                }else {
                                    removeList.push(amount);
                                    localStorageService.set('remove', removeList);
                                    grandTotal -= amount.value;
                                    localStorageService.set('grandTotal', grandTotal);
                                    cb(0);
                                }
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
            },


            //Convert currency function
            convertValue : function(value, valueCurrency, convertCurrency,cb){

                //Find rate
                var i=0;
                var rateArray=[];
                var rate=0;
                var result=0;
                var currencyRates = this.getcurrencyRates();


                for (i=0; i<currencyRates.length;i++){
                    if(currencyRates[i].currency==valueCurrency){
                        rateArray=currencyRates[i].rates;
                        var j=0;
                        for(j=0;j<rateArray.length;j++){

                            if(convertCurrency==rateArray[j].currency){
                                rate=rateArray[j].rates;
                                result=value*rate;
                                cb(result);
                            }
                        }
                    }
                }


            },


            //Convert grand total in function of currency
            convertCurrency : function(currency,cb){

               var rates=[];
               var it=0;
               var self=this;



               //check if the currency is loaded
               for(it=0;it<currencyRates.length;it++){
                   if(currency==currencyRates[it].currency){
                       rates = currencyRates[it].rates;
                   }
               }
               if(rates.length>0){

                   //List check and recompute of GRAND TOTAL

                   self.convertCompute(currency,self.getAddList(),rates,function(res1){
                       self.convertCompute(currency,self.getRemoveList(),rates,function(res2){
                           var fina = res1-res2;
                           cb(fina);
                       });
                   });

               }else{
                   cb("not found");
               }
            },

            convertCompute : function(currency, list, rates, cb){

                var it2=0;
                var total=0;
                var self=this;

                if(list.length>0) {
                    for (it2 = 0; it2 < list.length; it2++) {

                        if (list[it2].currency != currency) {

                            var k = 0;
                            //Search of rate
                            for (k = 0; k < rates.length; k++) {

                                //Rate found
                                if (rates[k].currency == list[it2].currency) {
                                    var result2 = 0;
                                    result2 = list[it2].value / rates[k].rates;
                                    total += result2;

                                }
                            }

                        } else {
                            total += list[it2].value;
                        }

                        if (it2 == list.length - 1) {
                            cb(total);
                        }
                    }
                }else{
                    cb(0);
                }
            }

        };

});