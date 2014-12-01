/*Title: Boot*/
/*Date:December 1 2014*/
/*Authors:Colin Gidzinski, Brandon Smith, Vaughan Hilts*/
/*Method:Connect the controllers to there 
pages and starts the app on a default page*/

//App Declaration
var app = angular.module('myApp', ['ionic', 'ngCordova']);

//Decalaration of identity in local storage
  app.run(function($http) {
      $http.defaults.headers.common['auth'] = localStorage['identity'];
  });

//Constant declaration of server address
  app.value('config', {
      serverUrl: 'http://localhost:8080/'
  });

//Routing table
  app.config(function($stateProvider, $urlRouterProvider) {
		//If nothing, then show the login
      $urlRouterProvider.otherwise('/login')
//Home Page
      $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: "HomeController"
        })

//EULA Page
      .state('eula', {
          url: '/eula',
          templateUrl: 'eula.html'
      })
	  
//About Page
      .state('about', {
          url: '/about',
          templateUrl: 'about.html'
      })
	  
//Alerts/Notifications Page
      .state('alerts', {
          url: '/alerts',
          templateUrl: 'alerts.html',
          controller: "AlertController"
      })
	  
//Login Page
      .state('login', {
          url: '/login',
          templateUrl: 'login.html',
          controller: 'LoginController'
      })
	  
//Help Page
      .state('help', {
          url: '/help',
          templateUrl: 'help.html'
      })
	  
//Page for posting New Items
      .state('post', {
          url: '/post/:id',
          templateUrl: 'post.html',
          controller: "PostItem"
      })
	  
//Page for viewing the list of Topics
      .state('topiclist', {
          url: '/topiclist/:id',
          templateUrl: 'topiclist.html',
          controller: "TopicList"
      })
	  
//Page for replying to a Post
      .state('reply', {
          url: '/reply/:id/:title',
          templateUrl: 'reply.html',
          controller: "ReplyItem"
      })
	  
//Page for viewing the list of Posts
      .state('postlist', {
          url: '/postlist/:id',
          templateUrl: 'postlist.html',
          controller: "PostList"
      })
	  
//Profile Page
      .state('profile', {
          url: '/profile',
          templateUrl: 'profile.html',
          controller: "ProfileController"
      });
  });