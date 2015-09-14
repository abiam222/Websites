/**
 * Created by mroman on 8/7/2015.
 */
angular.module('mtoApp')
    .factory('validateSecretsModel', validateSecretsModel);

validateSecretsModel.$inject = [];

function validateSecretsModel(){
    var service = {
        validateSecretsParams: validateSecretsParams,
        clear: clear
    };

    var params = {
        secrets: [],
        verified: false,
        attemptsRemaining: null
    };

    return service;

    function validateSecretsParams(data){
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
            secrets: [],
            verified: false,
            attemptsRemaining: null
        }
    }
}
