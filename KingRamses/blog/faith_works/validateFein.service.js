/**
 * Created by mroman on 7/28/2015.
 */
angular.module('mtoApp')
    .factory('validateFeinModel', validateFeinModel);

validateFeinModel.$inject = [];

function validateFeinModel(){
    var service = {
        validateFeinParams: validateFeinParams,
        clear: clear
    };

    var params = {
        fein: null,
        verified: false,
        task: null, //Tasks map to SAP i.e. 10 for manage 11 for file
        selectedTaxes: [],
        availableTaxes: [],
        userLocked: false
    };

    return service;

    function validateFeinParams(data){
        if(data){
            if(angular.isObject(data)){
                angular.forEach(data, function(val, key){
                    params[key] = val;
                })
            }
        }else{
            return params;
        }
    }

    function clear(){
        params = {
            fein: null,
            verified: false,
            task: null,
            selectedTaxes: [],
            availableTaxes: [],
            userLocked: false
        }
    }
}