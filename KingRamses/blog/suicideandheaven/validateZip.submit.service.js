/**
 * Created by mroman on 7/31/2015.
 */
angular.module('mtoApp')
    .factory('submitZip', submitZip);

submitZip.$inject = ['$http', 'rest', 'spinner', 'commonCache'];

function submitZip($http, rest, spinner, commonCache){
    return{
        validate: validate
    };

    function validate(zip, taxes){
        spinner.start();
        return $http.post(rest.validateZip + zip, taxes)
            .then(function(data){
                commonCache.removeAll();
                spinner.stop();
                return data.data
            });
    }
}