/**
 * Created by mroman on 8/12/2015.
 */
angular.module('mtoApp')
    .controller('validateOtp', validateOtp);

validateOtp.$inject = ['otpFormfields', 'submitOtp', '$state', 'generateOtp', 'validateFeinModel'];

function validateOtp(otpFormfields, submitOtp, $state, generateOtp, validateFeinModel){
    var validateOtp = this;

    validateOtp.model = {otp: null, invalidText: ''};
    validateOtp.otpForm = otpFormfields.otp();
    validateOtp.verify = verify;
    validateOtp.requestOtp = generateOtp.send;

    function verify(){
        var otpObject = {
            OTP: validateOtp.model.otp,
            taxes: validateFeinModel.validateFeinParams().selectedTaxes
        };
        submitOtp.validate(otpObject)//Submit access code to ECC
            .then(function(data){
                if(data === 'true'){
                    $state.go('mtoApp.businessList');
                }else{
                    validateOtp.model.invalidText = data;
                }
            });
    }
}