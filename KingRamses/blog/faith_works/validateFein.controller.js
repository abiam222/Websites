/**
 * Created by mroman on 7/22/2015.
 */
(function(){
angular.module('mtoApp')
    .controller('validateFein', validateFein);

validateFein.$inject = ['feinFormfields', '$state', 'submitFein', 'validateFeinModel'];

function validateFein(feinFormfields, $state, submitFein, validateFeinModel){
    var validateFein = this;

    validateFein.model = validateFeinModel.validateFeinParams();
    validateFein.feinForm = feinFormfields.fein();
    validateFein.taskForm = feinFormfields.task();
    validateFein.verify = verify;
    validateFein.next = next;
    function verify(){
        submitFein.validate(validateFein.model.fein)
            .then(function(){
                if(validateFein.model.verified){
                    $state.go('mtoApp.addBusiness.selectTask');
                }
            });
    }

    function next(){
        validateFein.model.task === 10 ? $state.go('mtoApp.addBusiness.validateSecrets') : $state.go('mtoApp.addBusiness.validateZip')
    }
}
})();
