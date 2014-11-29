app.filter('scoreFilter', function() {
  return function(input) {

    var sign = ''
    if(input > 0) {
      sign = '+';
    }

    return sign + input;

  };
})


app.controller('IndexController', function($scope, $cordovaPush, $ionicPlatform, config) {


    var androidConfig = {
      "senderID":"gentle-epoch-778",
    };

      $scope.notificationsCount = 0; 

      $ionicPlatform.ready(function() {

                if(ionic.Platform.isWebView()) {

                  // This controller loads on every page and controls the frame. Register our push notifications.
                  $cordovaPush.register(androidConfig).then(function(result) {
                    // Success!
                    // Hook into notifications
                    $scope.notificationsCount = 0;
                    localStorage['pushId'] = result; 
                    alert(result);

                    var payload = {
                      token: result
                    };

                    $http.post(config.serverUrl + 'notifications/register', payload).
                    success(function(data, status, headers, config) {
                        alert("Token has been registered succesfully.");
                    }).
                    error(function(data, status, headers, config) {
            
                    });       

                    
                  }, function(err) {
                    
                    // Not able to register, silently don't care

                  });



              }

  });





})

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

  app.controller('LoginController', function($scope, $http, $stateParams, $cordovaOauth, $location, config) {




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


  app.controller('TopicList', function($scope, $http, $stateParams, config) {

      var category = $stateParams.id;
      $scope.params = $stateParams;

      $http.get(config.serverUrl + 'submissions/questions?categoryId=' + category).
      success(function(data, status, headers, config) {
          $scope.names = data;
          console.log(data);
      }).
      error(function(data, status, headers, config) {
          alert("Connection Failed");
      });

  })

  app.controller('PostList', function($scope, $http, $stateParams, $ionicPopup, config) {

      var questionId = $stateParams.id;
      $scope.params = $stateParams;

      $http.get(config.serverUrl + 'submissions/questions/' + questionId).
      success(function(data, status, headers, config) {
          console.log(data);
          $scope.names = data;
      }).
      error(function(data, status, headers, config) {
          alert("Connection Failed");
      });


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

  app.controller('AlertController', function($scope, $http, $stateParams, config) {
           var SampAns = {
              answer: ['answer1','answer2','answer3']
            }
           var SampQuestions ={
              question: ['question1','question2','question3']
            }
            $scope.SampCurrent ={
              current: SampQuestions.question
            }
            $scope.SetQuest = function() {
          $scope.SampCurrent.current=SampQuestions.question
         
      }
            $scope.SetAns = function() {
          $scope.SampCurrent.current=SampAns.answer   
         
      }


  })

