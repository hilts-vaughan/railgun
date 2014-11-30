app.factory('PushProcessingService', function($http, config) {
    function onDeviceReady() {
        console.info('NOTIFY  Device is ready.  Registering with GCM server');
//register with google GCM server
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(gcmSuccessHandler, gcmErrorHandler, {
            'senderID': "545399189789",
            'ecb': 'onNotificationGCM'
        });
    }
//Success Log
    function gcmSuccessHandler(result) {
        console.info('NOTIFY  pushNotification.register succeeded.  Result = ' + result)
    }
//Error Log
    function gcmErrorHandler(error) {
        console.error('NOTIFY  ' + error);
    }
    return {
        initialize: function() {
            console.info('NOTIFY  initializing');
            document.addEventListener('deviceready', onDeviceReady, false);
        },
        registerID: function(id) {
            //Code here to store the user's ID on notification server here.
         },
//Un-register Function
        unregister: function() {
            console.info('unregister')
            var push = window.plugins.pushNotification;
            if (push) {
                push.unregister(function() {
//Success Log
                    console.info('unregister success')
                });
            }
        }
    }
});

app.controller('IndexController', function($scope, config, PushProcessingService, $http, $interval, $ionicScrollDelegate) {

    // Force all pages upwards when changing states
    $scope.$on('$stateChangeSuccess',
        function(event) {
//Scroll page to top
            $ionicScrollDelegate.scrollTop();
//Set current page
            $scope.currentPage = window.location.href;
        });

    $scope.$on('notification', function(event, args) {
        var count = args.count;
        // Make a call to fetch for them now
        $scope.fetchNotify();
    });

    $scope.fetchNotify = function() {
        // Fetch the latest notifications at this point in time
        $http.get(config.serverUrl + 'notifications').success(function(data, status, headers, config) {
            $scope.notifyCount = data.length;
        });
    };

    $scope.notifyCount = 0;
    $scope.fetchNotify();

    // Poll every 5s for new notifications
    $interval(function() {
        $scope.fetchNotify();
    }, 5000);
})

// ALL GCM notifications come through here.
function onNotificationGCM(e) {
    console.log('EVENT -&gt; RECEIVED:' + e.event + '');
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                console.log('REGISTERED with GCM Server -> REGID:' + e.regid + '');

                var p = {
                    token: e.regid
                };

                var $http = angular.element(document.body).injector().get('$http');

                $http.post('http://104.236.62.77:8080/' + 'notifications/register', p).
                success(function(data, status, headers, config) {

                }).
                error(function(data, status, headers, config) {
                    alert("Failed to register token for some reason...:" + data);
                });


            }
            break;

        case 'message':

            var $body = angular.element(document.body); // 1
            var $rootScope = $body.scope().$root; // 2
            $rootScope.$apply(function() { // 3
                $rootScope.$broadcast('notification', {
                    count: 1
                });
            });

            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                //we're using the app when a message is received.
                console.log('--INLINE NOTIFICATION--' + '');

                // if the notification contains a soundname, play it.
                //var my_media = new Media(&quot;/android_asset/www/&quot;+e.soundname);
                //my_media.play();
            } else {
                // otherwise we were launched because the user touched a notification in the notification tray.
                if (e.coldstart)
                    console.log('--COLDSTART NOTIFICATION--' + '');
                else
                    console.log('--BACKGROUND NOTIFICATION--' + '');


            }

            console.log('MESSAGE -&gt; MSG: ' + e.payload.message + '');
            console.log('MESSAGE: ' + JSON.stringify(e.payload));
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
//Get variables from previous page routed parameters
    var category = $stateParams.id;
    $scope.params = $stateParams;

    $scope.SubmitPost = function(title, body) {
//Setup array to be passed
        var question = {
            title: title,
            body: body,
            categoryId: category
        };
//Post to server
        $http.post(config.serverUrl + 'submissions/questions', question).
        success(function(data, status, headers, config) {
//Success Log
            console.log(data);
            $location.path("/postlist/" + data.id);
        }).
        error(function(data, status, headers, config) {
//Fail Log
            alert("Connection Failed");
        });
    };
})

app.controller('ReplyItem', function($scope, $http, $stateParams, $location, config) {
//Get variables from previous page routed parameters
    var id = $stateParams.id;
    var title = $stateParams.title
    $scope.Title = title;
    $scope.params = $stateParams;

    $scope.SubmitReply = function(body) {
//Setup item to be passed
        var question = {
            body: body,
        };
//Post to server
        $http.post(config.serverUrl + 'submissions/answers/' + id, question).
        success(function(data, status, headers, config) {
//Success Log
            $location.path("/postlist/" + data.parentQuestionId);
        }).
        error(function(data, status, headers, config) {
//Fail Log
            alert("Connection Failed");
        });
    };




})

app.controller('LoginController', function($scope, $http, $stateParams, $cordovaOauth, $location, config, PushProcessingService) {
    $scope.login = function() {
//Identify if local contains an identity
        localStorage["identity"] = $scope.identity;
//See if user exists
        $scope.checkIdentity();}

    $scope.checkIdentity = function() {
        var identity = localStorage["identity"];
        if (identity) {

            $http.defaults.headers.common['auth'] = identity;
//Success Identify Fount
            $http.get(config.serverUrl + 'login/' + identity).
            success(function(data, status, headers, config) {
//Init Push Service
                if (ionic.Platform.isWebView()) {
                    PushProcessingService.initialize();
                }
                $location.path("/home");
            }).
            error(function(data, status, headers, config) {
//Fail Log
                alert("Connection Failed");
            });
        }
    }
//Check Identity
    $scope.checkIdentity();

})

app.controller('TopicList', function($scope, $http, $stateParams, $ionicLoading, config) {
//Get variables from previous page routed parameters
    var category = $stateParams.id;
    $scope.params = $stateParams;
//Show Loading Screen
    $ionicLoading.show({
        template: 'Loading...'
    });
//Get from server
    $http.get(config.serverUrl + 'submissions/questions?categoryId=' + category).

    success(function(data, status, headers, config) {
//Success Log
        $scope.names = data;
        console.log(data);
    }).
    error(function(data, status, headers, config) {
//Fail Log
        alert("Connection Failed");
    });
    $ionicLoading.hide();
})

app.controller('PostList', function($scope, $http, $stateParams, $ionicPopup, $ionicLoading, config) {
//Get variables from previous page routed parameters
    var questionId = $stateParams.id;
    $scope.params = $stateParams;
//Show Loading Screen
    $ionicLoading.show({
        template: 'Loading...'
    });
//Get from server
    $http.get(config.serverUrl + 'submissions/questions/' + questionId).
    success(function(data, status, headers, config) {
        console.log(data);
        $scope.names = data;
    }).
    error(function(data, status, headers, config) {
//Fail Log
        alert("Connection Failed");
    });
    $ionicLoading.hide();
//Check Vote
    $scope.vote = function(submission, wasUpVote) {
//Load Variable
        var payload = {
            isUpvote: wasUpVote
        }
//Post Vote Stats
        $http.post(config.serverUrl + 'votes/' + submission._id, payload).success(function(data, status, headers, config) {
            if (data.status) {
                submission.voteIds.push(localStorage['identity']);
                submission.score = data.score;
            }
        });
    }
//Disallow multiple votes
    $scope.isVotedOn = function(submission) {
        if (!submission)
            return true;
        return submission.voteIds.indexOf(localStorage['identity']) != -1;
    }
//Report Popup
    $scope.show_Popup = function() {
        $scope.data = {}
// An elaborate popup
        var myPopup = $ionicPopup.show({
            title: 'Report Post',
            subTitle: 'Please select a report reason.',
            scope: $scope,
            buttons: [{
                text: '<font size="1">Spam</font>'
            }, {
                text: '<font size="1">Language</font>'
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
//Set default chosen category
    $scope.data = {
        category: 0
    };
});

app.controller('ProfileController', function ProfileController($scope, $http, $location) {
//Get Identity
    $scope.fetchIdentity = function() {
        return localStorage['identity'];
    }
//Logout
    $scope.logout = function() {
//DESTROY THE EVIDENCE
        localStorage.removeItem('identity');
        navigator.app.exitApp();
    }
});

app.controller('AlertController', function($scope, $http, $stateParams, config, $location, $rootScope) {
//Get Notifications
    $http.get(config.serverUrl + 'notifications').success(function(data, status, headers, config) {
        $scope.notifications = data;
    });

//Redirect on Select
    $scope.markNotification = function(id, redirect) {
        $http.get(config.serverUrl + 'notifications/' + id).success(function(data, status, headers, config) {
            $location.path('postlist/' + redirect);
            $rootScope.$broadcast('notification', {
                count: 1
            });
        });
    };
    $scope.setType = function(type) {
        $scope.type = type;
    }

    $scope.clear = function() {
//Load Variables
        var count = $scope.notifications.length;
        var total = 0;
//Get all Notifications out
        $scope.notifications.forEach(function(notification) {
            $http.get(config.serverUrl + 'notifications/' + notification._id).success(function(data, status, headers, config) {
                total++;
                if (total == count)
                    location.reload();
            });
        });
    }
    $scope.type = 'question';
})
