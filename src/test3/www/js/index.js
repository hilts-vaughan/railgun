  var app = angular.module('myApp', ['ionic', 'ngCordova']);
  app.config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/login')

    $stateProvider
    .state('index', {
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
      templateUrl: 'alerts.html'
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
      url: '/post/:value',
      templateUrl: 'post.html',
      controller:"PostItem"
    })

	.state('topiclist', {
      url: '/topiclist/:value',
      templateUrl: 'topiclist.html',
	  controller: "TopicList"
    })

	.state('reply', {
      url: '/reply/:id/:title',
      templateUrl: 'reply.html',
	  controller:"ReplyItem"
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






  app.controller('PostItem', function($scope, $http, $stateParams) {

    var category = $stateParams.value;
    $scope.params = $stateParams;


	$scope.SubmitPost = function(title,body) {

	    var question = {
    	title: title,
    	body: body,
    	categoryId: category
    };

	$http.post('http://localhost:8080/submissions/questions', question).
  success(function(data, status, headers, config) {
   alert('Succeed');
  }).
    error(function(data, status, headers, config) {
	alert("Connection Failed");
    });
    };
  })



    app.controller('ReplyItem', function($scope, $http, $stateParams) {
    var id = $stateParams.id;
	var title= $stateParams.title
		$scope.Title=title;
    $scope.params = $stateParams;

 	$scope.SubmitReply = function(body) {

	    var question = {

    	body: body,

    };

	$http.post('http://localhost:8080/submissions/answers/'+id, question).
  success(function(data, status, headers, config) {
   alert('Succeed');
  }).
    error(function(data, status, headers, config) {
	alert("Connection Failed");
    });
    };





  })


app.controller('LoginController', function($scope, $http, $stateParams, $cordovaOauth, $location) {




  $scope.login = function() {
        // Do stuff
        localStorage["identity"] = $scope.identity;

        $scope.checkIdentity();
    }

    $scope.checkIdentity = function() {
        var identity = localStorage["identity"];
        if(identity) {

          $http.defaults.headers.common['auth'] = identity;

            $http.get('http://localhost:8080/login/' + identity).
    success(function(data, status, headers, config) {
        $location.path("/home");
    console.log(data);
    }).
    error(function(data, status, headers, config) {
	alert("Connection Failed");
    });


        }
    }

    $scope.checkIdentity();

})


app.controller('TopicList', function($scope, $http, $stateParams) {

    var category = $stateParams.value;

    $scope.params = $stateParams;

    $http.get('http://localhost:8080/submissions/questions?categoryId='+category).
    success(function(data, status, headers, config) {
      $scope.names = data;
	  console.log(data);
    }).
    error(function(data, status, headers, config) {
	alert("Connection Failed");
    });

})

   app.controller('PostList', function($scope, $http, $stateParams, $ionicPopup) {

    var questionId = $stateParams.id;
	 $scope.params = $stateParams;

    $http.get('http://localhost:8080/submissions/questions/'+questionId).
	  success(function(data, status, headers, config) {
	  console.log(data);
    $scope.names = data;
  }).
  error(function(data, status, headers, config) {
	alert("Connection Failed");
	  });


	  $scope.show_Popup = function() {
  $scope.data = {}
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    title: 'Report Post',
    subTitle: 'Please select a report reason.',
    scope: $scope,
    buttons: [
      {text: '<font size="1">Spam</font>',onTap: function(e) {       alert('Spam - Post ID:'+$scope.names._id);    }},
      {text: '<font size="1">Language</font>',onTap: function(e) {   alert('Language - Post ID:'+$scope.names._id);    }},
	  {text: '<font size="1">Cancel</font>',onTap: function(e) {  }},
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

 };

 });



 app.controller('HomeController', function HomeController($scope, $http) {

    $scope.data = {
      category: 0
    };

 });
