/**
 * Created by mroman on 8/18/2015.
 */
(function(){
    angular.module('mtoApp')
        .factory('otpFormfields', otpFormFields);

    otpFormFields.$inject = ['$sce'];

    function otpFormFields($sce){
        return{
            otp: otp
        };

        function otp(){
            return [
                {
                    key: 'otp',
                    type: 'customInput',
                    templateOptions: {
                        label: "Access Code",
                        required: true,
                        helpText: $sce.trustAsHtml('<a href="JavaScript:void(0);" data-toggle="modal" data-target="#accessCodeModal">Request Another Code</a>')
                    }
                }
            ];
        }
    }
})();