/**
 * Created by mroman on 8/27/2015.
 */
angular.module('mtoApp')
    .factory('secretsFormFields', secretsFormFields);

secretsFormFields.$inject = ['validateSecretsModel', 'ownershipTypes'];

function secretsFormFields(validateSecretsModel, ownershipTypes){
    return{
        secrets: secrets
    };

    function secrets() {
        var formConfigObject = [
            {
                key: 'secrets[0].zzanswer',
                type: 'customInput',
                templateOptions: {
                    required: 'true'
                },
                expressionProperties: {
                    'templateOptions.label': 'model.secrets[0].zzquestion'
                }
            },
            {
                key: 'secrets[1].zzanswer',
                type: 'customInput',
                templateOptions: {
                    required: 'true'
                },
                expressionProperties: {
                    'templateOptions.label': 'model.secrets[1].zzquestion'
                }
            },
            {
                key: 'secrets[2].zzanswer',
                type: 'customInput',
                templateOptions: {
                    required: 'true'
                },
                expressionProperties: {
                    'templateOptions.label': 'model.secrets[2].zzquestion'
                }
            }
        ];

        getInputType();

        return formConfigObject;

        function getInputType(){
            var map = {
                '0001': 'customInput',
                '0002': 'customSelect',
                '0003': 'customInput'
            };

            var secrets = validateSecretsModel.validateSecretsParams().secrets;
            for(var i = 0; i < secrets.length; i++){
                formConfigObject[i].type = map[secrets[i].zzitemNo];
                if(formConfigObject[i].type === 'customSelect'){
                    formConfigObject[i].templateOptions.options = ownershipTypes.getTypes();
                    formConfigObject[i].defaultValue = '';
                }
            }
        }
    }
}