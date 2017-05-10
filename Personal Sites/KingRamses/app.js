(function() { 
  'use strict';

angular.module('myApp', ['ngRoute'])
		.config(config);


function config($routeProvider) {
  $routeProvider.when('/',{
    //controller:'Controller1',
    templateUrl: 'views/allblogs.html'//the ng-template id
  }).when('/view2', {
    //controller: 'Controller2',
    templateUrl: 'views/faith_works.html' //the ng-template id
   }).when('/view3', {
    templateUrl: 'views/mylastlove.html'
   }).when('/view4', {
     templateUrl: 'views/suicideandheaven.html'
   }).when('/view5', {
     templateUrl: 'views/kingsofegypt.html'
   }).when('/view6', {
    templateUrl: 'views/allblogs.html'
   })
  .otherwise({redirectTo:'/'});
  //$locationProvider.html5Mode(true);
 
 };

})();
