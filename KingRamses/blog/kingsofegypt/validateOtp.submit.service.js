/**
 * Created by mroman on 8/18/2015.
 */
angular.module('mtoApp')
    .factory('submitOtp', submitOtp);

submitOtp.$inject = ['$http', 'rest', 'spinner', 'commonCache'];

function submitOtp($http, rest, spinner, commonCache){
    return{
        validate: validate
    };
    
    function validate(otp){
        spinner.start();
        return $http.post(rest.validateOtp, otp)
            .then(function(data){
                commonCache.removeAll();
                spinner.stop();
                return data.data[0]
            });
    }
}