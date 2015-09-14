/**
 * Created by mroman on 7/28/2015.
 */
angular.module('mtoApp')
    .factory('submitFein', submitFein);

submitFein.$inject = ['$http', 'rest', 'spinner', 'validateFeinModel', 'validateSecretsModel'];

function submitFein($http, rest, spinner, validateFeinModel, validateSecretsModel){
    return{
        validate: validate
    };

    function validate(fein){
        spinner.start();
        return $http.get(rest.validateFein + fein)
            .then(function(data){
                spinner.stop();
                validateFeinModel.validateFeinParams(setValidateFein(data));
                validateSecretsModel.validateSecretsParams({secrets: data.data.sharedSecrets});
                console.log(data);
            });

        //Returns data structure required by the verify FEIN controller
        function setValidateFein(data){
            var feinParams = {
                verified: false,
                availableTaxes: [],
                userLocked: false
            };

            feinParams.verified = data.data.feinExist === 'true';
            feinParams.userLocked = data.data.userLocked;
            //Check if FEIN exists in SAP
            if(!feinParams.verified || feinParams.userLocked ) {
                $('#invalidFein').modal();
            }else{
                //Loop through array of taxTypes
                angular.forEach(data.data.taxTypes, function(val){
                    //Loop through object of tax description
                    angular.forEach(val, function(val){
                        //Show the checkbox for the tax types in the array
                        switch(val){
                            case '0004':
                                feinParams.availableTaxes.push({
                                    id: '0004',
                                    title: 'Sales Tax'
                                });
                                break;
                            case '0005':
                                feinParams.availableTaxes.push({
                                    id: '0005',
                                    title: 'Use Tax'
                                });
                                break;
                            case '0006':
                                feinParams.availableTaxes.push({
                                    id: '0006',
                                    title: 'Withholding Tax'
                                });
                        }
                    });
                });
            }
            return feinParams;
        }
    }
}