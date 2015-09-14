/**
 * Created by mroman on 7/31/2015.
 */
angular.module('mtoApp')
    .factory('validateZipModel', validateZipModel);

validateZipModel.$inject = [];

function validateZipModel(){
    var service = {
        validateZipParams: validateZipParams,
        clear: clear
    };

    var params = {
        zip: null,
        attemptsRemaining: null
    };

    return service;

    function validateZipParams(data){
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
            zip: null,
            attemptsRemaining: null
        }
    }
}
