  var app = angular.module('myApp', ['ionic']);
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
	
	.state('help', {
      url: '/help',
      templateUrl: 'help.html'
    })
	
	.state('post', {
      url: '/post',
      templateUrl: 'post.html'
    })
	
	.state('topiclist', {
      url: '/topiclist',
      templateUrl: 'topiclist.html',
	  controller: "TopicControl"
    })
	
	.state('reply', {
      url: '/reply',
      templateUrl: 'reply.html'
    })
	
	.state('postlist', {
      url: '/postlist',
      templateUrl: 'postlist.html',
	 controller: "PostControl"
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'profile.html'
    });





  });




 app.controller('TopicControl', function TopicControl($scope, $http) {
	
	
			$http.get('http://localhost:8080/submissions/questions').
	  success(function(data, status, headers, config) {
      $scope.names = data;
	  }).
	  error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
	  });

 });

   app.controller('PostControl', function PostControl($scope, $http) {
		$http.get('http://localhost:8080/submissions/questions/1').
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
 
    $scope.doge = function() {
      alert("Do something amazing!");
    }

    $scope.display = function() {
     // console.log($scope.data);
      console.log($scope.data);
    }

    $scope.data = {
      value: 4
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
  

