/**
 * Created by mroman on 8/27/2015.
 */
angular.module('mtoApp')
    .factory('submitSecrets', submitSecrets);

submitSecrets.$inject = ['$http', 'rest', 'spinner', 'commonCache'];

function submitSecrets($http, rest, spinner, commonCache){
    return{
        validate: validate
    };

    function validate(secrets){
        spinner.start();
        return $http.post(rest.validateSecrets, secrets)
            .then(function(data){
                commonCache.removeAll();
                spinner.stop();
                return data.data
            });
    }
}