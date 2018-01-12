
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('sportsApp', ['ngRoute']); 


// this is without $scope
myApp.controller('mainController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Football Club';
  this.pageSubHeading = 'A collection of English Premier League matches'
  
  this.sports = [];
  this.sports1=[];

  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
  this.baseUrl1 = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';

  this.loadAllMatches = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl
        //url: main.baseUrl1
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          main.sports = response.data.rounds;
          console.log(main.sports);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });
  }  // end load all matches  

  this.loadAllMatches1 = function(){
      
      $http({
        method: 'GET',
        //url: main.baseUrl
        url: main.baseUrl1
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          main.sports1 = response.data.rounds;
          console.log(main.sports1);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all matches1
   
this.loadAllMatches();
this.loadAllMatches1();

}]); // end controller


myApp.controller('singleMatchController',['$routeParams',function($routeParams) {

  //create a context
  var main = this;


  this.pageHeading = 'Football Club';
  this.pageSubHeading = 'A collection of English Premier League matches'
 
  this.team1=angular.fromJson($routeParams.team1);
  this.team2=angular.fromJson($routeParams.team2);
  this.score1=$routeParams.score1;
  this.score2=$routeParams.score2;
  this.date= $routeParams.date;

  console.log(main.team1.name);
  console.log(main.team2.name);
  
}]); 

myApp.controller('statsViewController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams) {

  var main = this;

  this.pageHeading = 'Football Club';
  this.pageSubHeading = 'A collection of English Premier League matches'
  
  this.totalMatchesPlayed1 = [];
  this.totalWins1 = [];
  this.totalLost1 = [];
  this.totaldraw1 = [];
  this.totalgoals1 = 0;
  this.teamname1 = "";

  this.totalMatchesPlayed2 = [];
  this.totalWins2 = [];
  this.totalLost2 = [];
  this.totaldraw2 = [];
  this.totalgoals2 = 0;
  this.teamname2 = "";

  this.totalMatchesPlayed = [];
  this.totalWins = [];
  this.totalLost = [];
  this.totaldraw = [];
  this.totalgoals = 0;
    
  this.teamkey = $routeParams.teamkey;

  this.loadStats = function() {

  main.firstApi = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', { cache: false });
  main.secondApi = $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', { cache: false });

  $q.all([main.firstApi, main.secondApi]).then(function successCallback(response1) {
    var main2 = this;
    this.Rounds1 = [];
    this.Rounds2 = [];
    this.firstApiRounds = [];
    this.secondApiRounds = [];

    this.Rounds1 = response1[0].data.rounds;
    this.Rounds2 = response1[1].data.rounds;
  
    // creating a function for first api
    function Url1() {
      for (var i = 0; i < main2.Rounds1.length; i++) {
        for (var j = 0; j < main2.Rounds1[i].matches.length; j++) {
          main2.firstApiRounds.push(main2.Rounds1[i].matches[j]);
          }
      }
      for (var i = 0; i < main2.firstApiRounds.length; i++) {
        if ((main2.firstApiRounds[i].team1.key === main.teamkey || main2.firstApiRounds[i].team2.key === main.teamkey)) {
          main.totalMatchesPlayed1.push(main2.firstApiRounds[i].team1.name);

          if (main2.firstApiRounds[i].team1.key === main.teamkey) {
            main.teamname1 = main2.firstApiRounds[i].team1.name;
            main.totalgoals1 = main.totalgoals1 + main2.firstApiRounds[i].score1;
                  
            if (main2.firstApiRounds[i].score1 > main2.firstApiRounds[i].score2) {       
              main.totalWins1.push(main2.firstApiRounds[i].team2.key);
              } 
            else if (main2.firstApiRounds[i].score1 < main2.firstApiRounds[i].score2) {
              main.totalLost1.push(main2.firstApiRounds[i].team1.key);
              } 
            else if (main2.firstApiRounds[i].score1 == main2.firstApiRounds[i].score2) {
              main.totaldraw1.push(main2.firstApiRounds[i].team1.key);
              } 
              else {
                console.log(response);
              }
            }
             
          if (main2.firstApiRounds[i].team2.key === main.teamkey) {
            main.totalgoals1 = main.totalgoals1 + main2.firstApiRounds[i].score2;

            if (main2.firstApiRounds[i].score1 < main2.firstApiRounds[i].score2) {
              main.totalWins1.push(main2.firstApiRounds[i].team2.key);
              } 
            else if (main2.firstApiRounds[i].score1 > main2.firstApiRounds[i].score2) {
              main.totalLost1.push(main2.firstApiRounds[i].team1.key);
              } 
            else if (main2.firstApiRounds[i].score1 == main2.firstApiRounds[i].score2) {
              main.totaldraw1.push(main2.firstApiRounds[i].team1.key);
              } 
            else {
              console.log(nresponse);
                }
              }              
          } 
      } // end for loop 
    }; 
    Url1();

    // creating a function for second api
    function Url2() {
      for (var i = 0; i < main2.Rounds2.length; i++) {
        for (var j = 0; j < main2.Rounds2[i].matches.length; j++) {
          main2.secondApiRounds.push(main2.Rounds2[i].matches[j]);
          }
      }
      for (var i = 0; i < main2.secondApiRounds.length; i++) {
        if ((main2.secondApiRounds[i].team1.key === main.teamkey || main2.secondApiRounds[i].team2.key === main.teamkey)) {
          main.totalMatchesPlayed2.push(main2.secondApiRounds[i].team1.name);

          if ( main2.secondApiRounds[i].team1.key === main.teamkey) {
            main.teamname2 = main2.secondApiRounds[i].team1.name;
            main.totalgoals2 = main.totalgoals2 + main2.firstApiRounds[i].score1;

            if (main2.secondApiRounds[i].score1 > main2.secondApiRounds[i].score2) {
              main.totalWins2.push(main2.secondApiRounds[i].team2.key);
              } 
            else if (main2.secondApiRounds[i].score1 < main2.secondApiRounds[i].score2) {
              main.totalLost2.push(main2.secondApiRounds[i].team1.key);
              } 
            else if (main2.secondApiRounds[i].score1 == main2.secondApiRounds[i].score2) {
              main.totaldraw2.push(main2.secondApiRounds[i].team1.key);
              } 
            else {
              console.log(response);
              }
          }
            
          if ( main2.secondApiRounds[i].team2.key === main.teamkey) {
            main.totalgoals2 = main.totalgoals2 + main2.firstApiRounds[i].score2;  

            if (main2.secondApiRounds[i].score1 < main2.secondApiRounds[i].score2) {
              main.totalWins2.push(main2.secondApiRounds[i].team2.key);
              } 
            else if (main2.secondApiRounds[i].score1 > main2.secondApiRounds[i].score2) {
              main.totalLost2.push(main2.secondApiRounds[i].team1.key);
              } 
            else if (main2.secondApiRounds[i].score1 == main2.secondApiRounds[i].score2) {
              main.totaldraw2.push(main2.secondApiRounds[i].team1.key);
              } 
              else {
                console.log(response);
              }
          }             
        } 
      } // end for loop
    }; 
    Url2();

  //calculating total stats
  main.totalMatchesPlayed = main.totalMatchesPlayed1.length + main.totalMatchesPlayed2.length;
  main.totalWins = main.totalWins1.length + main.totalWins2.length;
  main.totalLost = main.totalLost1.length + main.totalLost2.length;
  main.totaldraw = main.totaldraw1.length + main.totaldraw2.length;
  main.totalgoals = main.totalgoals1 + main.totalgoals2;

    
  }, function errorCallback(response) {
    alert("some error occurred. Check the console.");
    console.log(response);
    });
  } 
    this.loadStats();
}]); 

