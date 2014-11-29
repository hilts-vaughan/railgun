  var app = angular.module('myApp', ['ionic', 'ngCordova']);

  app.run(function($http) {
      $http.defaults.headers.common['auth'] = localStorage['identity'];
  });

  app.value('config', {
      serverUrl: 'http://localhost:8080/'
  });


  app.config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/login')

      $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: "HomeController"
        })


      .state('eula', {
          url: '/eula',
          templateUrl: 'eula.html'
      })

      .state('alerts', {
          url: '/alerts',
          templateUrl: 'alerts.html',
          controller: "AlertController"
      })

      .state('login', {
          url: '/login',
          templateUrl: 'login.html',
          controller: 'LoginController'
      })

      .state('help', {
          url: '/help',
          templateUrl: 'help.html'
      })

      .state('post', {
          url: '/post/:id',
          templateUrl: 'post.html',
          controller: "PostItem"
      })

      .state('topiclist', {
          url: '/topiclist/:id',
          templateUrl: 'topiclist.html',
          controller: "TopicList"
      })

      .state('reply', {
          url: '/reply/:id/:title',
          templateUrl: 'reply.html',
          controller: "ReplyItem"
      })

      .state('postlist', {
          url: '/postlist/:id',
          templateUrl: 'postlist.html',
          controller: "PostList"
      })

      .state('profile', {
          url: '/profile',
          templateUrl: 'profile.html'
      });

  });
