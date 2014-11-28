  var app = angular.module('myApp', ['ionic', 'ngCordova']);
  app.config(function($stateProvider) {
    $stateProvider
    .state('index', {
      url: '/',
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
  });
    };





  })


app.controller('LoginController', function($scope, $http, $stateParams) {


  $scope.googleLogin = function() {
        alert("!");
        $cordovaOauth.google("CLIENT_ID_HERE", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }

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
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

})

   app.controller('PostList', function($scope, $http, $stateParams) {

    var questionId = $stateParams.id;
	 $scope.params = $stateParams;

    $http.get('http://localhost:8080/submissions/questions/'+questionId).
	  success(function(data, status, headers, config) {
	  console.log(data);
    $scope.names = data;
  }).
  error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
    // or server returns response with an error status.
	  });
 });



 app.controller('HomeController', function HomeController($scope, $http) {

    $scope.data = {
      category: 0
    };



 });

  angular.module('mySuperApp', ['ionic'])
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {
// Triggered on a button click, or some other target
$scope.show_Popup = function() {
  $scope.data = {}
  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    title: 'Report Reason',
    subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      {	  text: '<b>Stupid Person</b>',        onTap: function(e) {        }      },
      {	  text: '<b>Stupid Question</b>',        onTap: function(e) {        }      },
	  {	  text: '<b>I Dun Goofd</b>',        onTap: function(e) {        }      },
    ]
  });
  myPopup.then(function(res) {
    console.log('Tapped!', res);
  });

 };


});


