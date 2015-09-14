/**
 * Created by mroman on 7/27/2015.
 */
(function(){
angular.module('mtoApp')
    .factory('feinFormfields', feinFormFields);

feinFormFields.$inject = ['$sce'];

function feinFormFields($sce){
    return{
        fein: fein,
        task: task
    };

    function fein(){
        return [
            {
                key: 'fein',
                type: 'customInput',
                templateOptions: {
                    label: 'FEIN or Treasury Number (TR)',
                    required: true,
                    minlength: 9,
                    maxlength: 9,
                    helpText: $sce.trustAsHtml('<a href="http://www.michiganbusiness.org/start-up/business-assistance/#licenses" target="_blank">I don\'t have an FEIN</a>')
                },
                ngModelAttrs: {
                    maxlength: {
                        bound: 'ng-maxlength',
                        attribute: 'maxlength'
                    }
                }
            }
        ];
    }

    function task(){
        return [
            {
                fieldGroup: [
                    {
                        fieldGroup: [
                            {
                                key: 'task',
                                type: 'customRadio',
                                templateOptions: {
                                    label: 'What tasks will you perform for the business?',
                                    options: [],
                                    required: true
                                },
                                controller: ['$scope', 'validateFeinModel', function($scope, validateFeinModel){
                                    $scope.to.options = options();

                                    function options(){
                                        if(validateFeinModel.validateFeinParams().availableTaxes.length === 0){
                                            {
                                                return [
                                                    {
                                                        name: 'Manage Business Account Information (Full Access Rights)',
                                                        value: 10
                                                    }
                                                ]
                                            }
                                        }else{
                                            return [
                                                {
                                                    name: 'Manage Business Account Information (Full Access Rights)',
                                                    value: 10
                                                },
                                                {
                                                    name: 'File and Pay Sales, Use and Withholding Taxes Only (Limited Access Rights)',
                                                    value: 11
                                                }
                                            ]
                                        }
                                    }
                                }]
                            }
                        ]
                    },
                    {
                        key: 'selectedTaxes',
                        type: 'customMultiCheckbox',
                        templateOptions: {
                            label: 'Tax Types You Will Be Responsible for Filing/Paying',
                            options: [],
                            valueProp: 'id',
                            labelProp: 'title',
                            required: 'model.task === 11'
                        },
                    controller: ['$scope', 'validateFeinModel', function($scope, validateFeinModel){
                        $scope.to.options = validateFeinModel.validateFeinParams().availableTaxes;
                    }],
                        hideExpression: '!(model.task === 11)'
                    }
                ],
                hideExpression: '!model.verified'
            }
        ];
    }
}
})();
