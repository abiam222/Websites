/**
 * Created by mroman on 8/18/2015.
 */
angular.module('mtoApp')
    .factory('generateOtp', generateOtp);

generateOtp.$inject = ['$http', 'rest'];

function generateOtp($http, rest){
    return{
        send: send
    };

    function send(){
        $http.get(rest.generateOtp);
    }
}