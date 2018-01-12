//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'mySport'
        })
        
        .when('/match-view/:team1/:team2/:score1/:score2/:date',{

        	templateUrl     : 'views/match-view.html',
        	controller 		: 'singleMatchController',
        	controllerAs 	: 'singleMatch'
        })

        .when('/stats-view/:teamkey', {
            templateUrl: 'views/stats-view.html',
            controller: 'statsViewController',
            controllerAs: 'singleTeam'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);