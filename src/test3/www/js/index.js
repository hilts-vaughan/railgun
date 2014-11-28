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
      url: '/reply',
      templateUrl: 'reply.html'
    })
	
	.state('postlist', {
      url: '/postlist:value',
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
    alert(category);
    $http.get('http://localhost:8080/submissions/questions').
    success(function(data, status, headers, config) {
      $scope.names = data;
    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

  })

  
 
app.controller('TopicList', function($scope, $http, $stateParams) {
    
    var category = $stateParams.value; 
    
    $scope.params = $stateParams; 
    alert(category);

    $http.get('http://localhost:8080/submissions/questions').
    success(function(data, status, headers, config) {
      $scope.names = data;
    }).
    error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });

})

   app.controller('PostList', function($scope, $http, $stateParams) {
		
    var category = $stateParams.value;

    $http.get('http://localhost:8080/submissions/questions/2').
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
  

