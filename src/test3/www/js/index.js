  var app = angular.module('myApp', ['ionic']);
  app.config(function($stateProvider) {
    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'home.html'
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
      templateUrl: 'topiclist.html'
    })
	
	.state('reply', {
      url: '/reply',
      templateUrl: 'reply.html'
    })
	
	.state('postlist', {
      url: '/postlist',
      templateUrl: 'postlist.html'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: 'profile.html'
    }


    );





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
  


angular.module('myApp')
// Click to navigate
// similar to <a href="#/partial"> but hash is not required, 
// e.g. <div click-link="/partial">
.directive('clickLink', ['$location', function($location) {
    return {
        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.$apply(function() {
                    $location.path(attrs.clickLink);
                });
            });
        }
    }
}]);