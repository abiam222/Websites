/**
 * Created by mroman on 7/27/2015.
 */
(function(){
angular.module('mtoApp')
    .controller('validateZip', validateZip);

validateZip.$inject = ['zipFormfields', 'submitZip', 'validateZipModel', 'businessListData', '$state', 'validateFeinModel'];

function validateZip(zipFormfields, submitZip, validateZipModel, businessListData, $state, validateFeinModel){
    var validateZip = this;

    validateZip.model = validateZipModel.validateZipParams();
    validateZip.zipForm = zipFormfields.zip();
    validateZip.verify = verify;

    function verify(){
        var taxObject = {
            taxes: validateFeinModel.validateFeinParams().selectedTaxes
        };
        submitZip.validate(validateZip.model.zip, taxObject)//Submit the selected taxes to ECC with Zip
            .then(function(data){
                if(data[0] === 'true'){//If zip is correct
                    verified();
                }else{
                    invalidZip(data);
                }
            });

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

        function invalidZip(data){
            validateZipModel.validateZipParams({attemptsRemaining: data[1]});
            $('#invalidZip').modal();
        }
    }
}
})();