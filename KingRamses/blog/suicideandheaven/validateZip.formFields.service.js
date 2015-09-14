/**
 * Created by mroman on 7/31/2015.
 */
(function(){
    angular.module('mtoApp')
        .factory('zipFormfields', zipFormFields);

    zipFormFields.$inject = [];

    function zipFormFields(){
        return{
            zip: zip
        };

        function zip(){
            return [
                {
                    key: 'zip',
                    type: 'customInput',
                    templateOptions: {
                        label: "Business Legal Zip Code",
                        required: true,
                        minlength: 5,
                        maxlength: 10
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
    }
})();
