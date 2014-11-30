app.filter('scoreFilter', function() {
  return function(input) {

    var sign = ''
    if(input > 0) {
      sign = '+';
    }

    return sign + input;

  };
});


app.factory('PushProcessingService', function($http, config) {
        function onDeviceReady() {
            console.info('NOTIFY  Device is ready.  Registering with GCM server');
            //register with google GCM server
            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {'senderID':"545399189789",'ecb':'onNotificationGCM'});
        }
        function gcmSuccessHandler(result) {
            console.info('NOTIFY  pushNotification.register succeeded.  Result = '+result)
        }
        function gcmErrorHandler(error) {
            console.error('NOTIFY  '+error);
        }
        return {
            initialize : function () {
                console.info('NOTIFY  initializing');
                document.addEventListener('deviceready', onDeviceReady, false);
            },
            registerID : function (id) {
                //Insert code here to store the user's ID on your notification server.
                //You'll probably have a web service (wrapped in an Angular service of course) set up for this.
                //For example:

                var p = {
                  token: id
                };

              $http.post(config.serverUrl + 'notifications/register', p).
              success(function(data, status, headers, config) {

              }).
              error(function(data, status, headers, config) {
                alert("Failed to register token for some reason...:" + data);
              });

            },
            //unregister can be called from a settings area.
            unregister : function () {
                console.info('unregister')
                var push = window.plugins.pushNotification;
                if (push) {
                    push.unregister(function () {
                        console.info('unregister success')
                    });
                }
            }
        }
    });




app.controller('IndexController', function($scope, $cordovaPush, $ionicPlatform, config, PushProcessingService, $http, $interval) {




  $scope.$on('notification', function(event, args) {

      var count = args.count;

      // Make a call to fetch for them now
      $scope.fetchNotify();


    });

    $scope.fetchNotify = function() {

      // Fetch the latest notifications at this point in time
      // we've been alerted there's some to be had

      $http.get(config.serverUrl + 'notifications').success(function(data, status, headers, config){
        $scope.notifyCount = data.length;
      });




    };

    $scope.notifyCount = 0;
    $scope.fetchNotify();

    // Poll every 5s for new notifications
    $interval(function(){
      $scope.fetchNotify();
    },5000);


})


// ALL GCM notifications come through here.
function onNotificationGCM(e) {
    console.log('EVENT -&gt; RECEIVED:' + e.event + '');
    switch( e.event )
    {
        case 'registered':
            if ( e.regid.length > 0 )
            {
                console.log('REGISTERED with GCM Server -> REGID:' + e.regid + '');

            }
            break;

        case 'message':

            var $body = angular.element(document.body);   // 1
            var $rootScope = $body.scope().$root;         // 2
            $rootScope.$apply(function () {               // 3
                $rootScope.$broadcast('notification', {count: 1});
            });

            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground)
            {
                //we're using the app when a message is received.
                console.log('--INLINE NOTIFICATION--' + '');

                // if the notification contains a soundname, play it.
                //var my_media = new Media(&quot;/android_asset/www/&quot;+e.soundname);
                //my_media.play();
            }
            else
            {
                // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    console.log('--COLDSTART NOTIFICATION--' + '');
                else
                    console.log('--BACKGROUND NOTIFICATION--' + '');


            }

            console.log('MESSAGE -&gt; MSG: ' + e.payload.message + '');
            console.log('MESSAGE: '+ JSON.stringify(e.payload));
            break;

        case 'error':
            console.log('ERROR -&gt; MSG:' + e.msg + '');
            break;

        default:
            console.log('EVENT -&gt; Unknown, an event was received and we do not know what it is');
            break;
    }
}



app.controller('PostItem', function($scope, $http, $stateParams, $location, config) {

      var category = $stateParams.id;
      $scope.params = $stateParams;


      $scope.SubmitPost = function(title, body) {

          var question = {
              title: title,
              body: body,
              categoryId: category
          };

          $http.post(config.serverUrl + 'submissions/questions', question).
          success(function(data, status, headers, config) {
              console.log(data);
              $location.path("/postlist/" + data.id);
          }).
          error(function(data, status, headers, config) {
              alert("Connection Failed");
          });
      };
  })



  app.controller('ReplyItem', function($scope, $http, $stateParams, $location, config) {
      var id = $stateParams.id;
      var title = $stateParams.title
      $scope.Title = title;
      $scope.params = $stateParams;

      $scope.SubmitReply = function(body) {

          var question = {

              body: body,

          };

          $http.post(config.serverUrl + 'submissions/answers/' + id, question).
          success(function(data, status, headers, config) {
              $location.path("/postlist/" + data.parentQuestionId);
          }).
          error(function(data, status, headers, config) {
              alert("Connection Failed");
          });
      };




  })

  app.controller('LoginController', function($scope, $http, $stateParams, $cordovaOauth, $location, config, PushProcessingService) {




      $scope.login = function() {
          // Do stuff
          localStorage["identity"] = $scope.identity;

          $scope.checkIdentity();
      }

      $scope.checkIdentity = function() {
          var identity = localStorage["identity"];
          if (identity) {

              $http.defaults.headers.common['auth'] = identity;

              $http.get(config.serverUrl + 'login/' + identity).
              success(function(data, status, headers, config) {



                if(ionic.Platform.isWebView()) {
                    PushProcessingService.initialize();
                }

                $location.path("/home");


              }).
              error(function(data, status, headers, config) {
                  alert("Connection Failed");
              });


          }
      }

      $scope.checkIdentity();

  })


  app.controller('TopicList', function($scope, $http, $stateParams, $ionicLoading, config) {

      var category = $stateParams.id;
      $scope.params = $stateParams;





    $ionicLoading.show({
      template: 'Loading...'
    });






      $http.get(config.serverUrl + 'submissions/questions?categoryId=' + category).

      success(function(data, status, headers, config) {

          $scope.names = data;
          console.log(data);
      }).
      error(function(data, status, headers, config) {
          alert("Connection Failed");
      });
$ionicLoading.hide();
  })

  app.controller('PostList', function($scope, $http, $stateParams, $ionicPopup, $ionicLoading, config) {

      var questionId = $stateParams.id;
      $scope.params = $stateParams;


	  $ionicLoading.show({
      template: 'Loading...'
    });

      $http.get(config.serverUrl + 'submissions/questions/' + questionId).
      success(function(data, status, headers, config) {
          console.log(data);
          $scope.names = data;
      }).
      error(function(data, status, headers, config) {
          alert("Connection Failed");
      });
$ionicLoading.hide();

      $scope.vote = function(submission, wasUpVote) {

        var payload = {
          isUpvote: wasUpVote
        }

        $http.post(config.serverUrl + 'votes/' + submission._id, payload).success(function(data, status, headers, config) {

            if(data.status) {
              submission.voteIds.push(localStorage['identity']);
              submission.score = data.score;
            }

        });

      }

      $scope.isVotedOn = function(submission) {

        if(!submission)
          return true;

        return submission.voteIds.indexOf(localStorage['identity']) != -1;

      }

      $scope.show_Popup = function() {
          $scope.data = {}
              // An elaborate, custom popup
          var myPopup = $ionicPopup.show({
              title: 'Report Post',
              subTitle: 'Please select a report reason.',
              scope: $scope,
              buttons: [{
                  text: '<font size="1">Spam</font>',
                  onTap: function(e) {
					  window.open('mailto:reporting@helpmelaurier.com?subject=Report Post: Spam&body=Do Not Remove [: Post Title: '+$scope.names.title+'ID: '+$scope.names._id+'Category: '+$scope.names.categoryId+']');
                  }
              }, {
                  text: '<font size="1">Language</font>',
                  onTap: function(e) {
                      window.open('mailto:reporting@helpmelaurier.com?subject=Report Post: Language&body=Do Not Remove [: Post Title: '+$scope.names.title+'ID: '+$scope.names._id+'Category: '+$scope.names.categoryId+']');

                  }
              }, {
                  text: '<font size="1">Cancel</font>',
                  onTap: function(e) {}
              }, ]
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

  app.controller('AlertController', function($scope, $http, $stateParams, config, $location, $rootScope) {

        $http.get(config.serverUrl + 'notifications').success(function(data, status, headers, config){
        $scope.notifications = data;
      });


      $scope.markNotification = function(id, redirect) {

                $http.get(config.serverUrl + 'notifications/' + id).success(function(data, status, headers, config){
                  $location.path('postlist/' + redirect);
                  $rootScope.$broadcast('notification', {count: 1}); // signal alerts as marked off
                });

      };


  })

