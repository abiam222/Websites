/**
 * Created by mroman on 8/7/2015.
 */
angular.module('mtoApp')
    .controller('validateSecrets', validateSecrets);

validateSecrets.$inject = ['secretsFormFields', '$state', 'validateSecretsModel', 'submitSecrets', 'businessListData'];

function validateSecrets(secretsFormFields, $state, validateSecretsModel, submitSecrets, businessListData){
    var validateSecrets = this;

    validateSecrets.model = validateSecretsModel.validateSecretsParams();
    validateSecrets.secretsForm = secretsFormFields.secrets();
    validateSecrets.verify = verify;

    function verify(){
        submitSecrets.validate(validateSecrets.model.secrets)
            .then(function(data){
                if(data[0] === 'true'){//If secrets are correct
                    verified();
                }else{
                    invalidSecrets(data);
                }
            })
    }

    function verified(){
        businessListData.getBusinessList()
            .then(function(data){
                if(data.data.length < 1){//If this is the first business added go to access code screen
                    $state.go('mtoApp.addBusiness.validateOtp');
                }else{
                    $state.go('mtoApp.businessList');
                }
            });
    }

    function invalidSecrets(data){
        validateSecretsModel.validateSecretsParams({attemptsRemaining: data[1]});
        ('#invalidSecrets').modal();
    }
}